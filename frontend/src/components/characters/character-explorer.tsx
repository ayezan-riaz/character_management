'use client';

import { keepPreviousData } from '@tanstack/react-query';
import Image from 'next/image';
import { parseAsString, parseAsStringLiteral, useQueryStates } from 'nuqs';
import { useDeferredValue, useTransition } from 'react';
import {
  CharacterGender,
  CharacterStatus,
  useCharactersQuery,
} from '@/graphql/generated';
import styles from './character-explorer.module.css';

const statusValues = [
  CharacterStatus.Alive,
  CharacterStatus.Dead,
  CharacterStatus.Unknown,
] as const;

const genderValues = [
  CharacterGender.Male,
  CharacterGender.Female,
  CharacterGender.Unknown,
] as const;

const statusParser = parseAsStringLiteral(statusValues);
const genderParser = parseAsStringLiteral(genderValues);

const statusOptions = [
  { label: 'All statuses', value: '' },
  { label: 'Alive', value: CharacterStatus.Alive },
  { label: 'Dead', value: CharacterStatus.Dead },
  { label: 'Unknown', value: CharacterStatus.Unknown },
];

const genderOptions = [
  { label: 'All genders', value: '' },
  { label: 'Male', value: CharacterGender.Male },
  { label: 'Female', value: CharacterGender.Female },
  { label: 'Unknown', value: CharacterGender.Unknown },
];

const humanizeLabel = (value: string) =>
  value.charAt(0) + value.slice(1).toLowerCase();

const trimDescription = (description: string) =>
  description.length > 132 ? `${description.slice(0, 129)}...` : description;

export function CharacterExplorer() {
  const [isPending, startTransition] = useTransition();
  const [{ search, status, gender }, setQueryStates] = useQueryStates(
    {
      search: parseAsString,
      status: statusParser,
      gender: genderParser,
    },
    {
      history: 'replace',
      shallow: false,
    },
  );

  const deferredSearch = useDeferredValue(search ?? '');
  const trimmedSearch = deferredSearch.trim();

  const query = useCharactersQuery(
    {
      filter:
        status || gender || trimmedSearch
          ? {
              status: status ?? undefined,
              gender: gender ?? undefined,
              search: trimmedSearch || undefined,
            }
          : undefined,
    },
    {
      placeholderData: keepPreviousData,
    },
  );

  const characters = query.data?.characters ?? [];
  const hasActiveFilters = Boolean(status || gender || (search ?? '').trim());
  const isBusy = isPending || query.isFetching;

  const handleSearchChange = (value: string) => {
    startTransition(() => {
      void setQueryStates({
        search: value.trim() ? value : null,
      });
    });
  };

  const handleStatusChange = (value: string) => {
    startTransition(() => {
      void setQueryStates({
        status: value ? (value as CharacterStatus) : null,
      });
    });
  };

  const handleGenderChange = (value: string) => {
    startTransition(() => {
      void setQueryStates({
        gender: value ? (value as CharacterGender) : null,
      });
    });
  };

  const clearFilters = () => {
    startTransition(() => {
      void setQueryStates({
        search: null,
        status: null,
        gender: null,
      });
    });
  };

  return (
    <main className={styles.page}>
      <div className={styles.shell}>
        <header className={styles.hero}>
          <div className={styles.eyebrow}>Next.js + NestJS GraphQL workspace</div>
          <h1 className={styles.headline}>Character management with live server-side filters.</h1>
          <p className={styles.subtext}>
            Search across names and descriptions, narrow results by status or
            gender, and keep every filter synchronized in the URL so the view is
            easy to share and revisit.
          </p>
        </header>

        <section className={styles.toolbar} aria-label="Character filters">
          <div className={styles.filters}>
            <label className={styles.field}>
              <span className={styles.fieldLabel}>Search</span>
              <input
                className={styles.fieldControl}
                type="search"
                placeholder="Search by name or description"
                value={search ?? ''}
                onChange={(event) => handleSearchChange(event.target.value)}
              />
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Status</span>
              <select
                className={styles.fieldControl}
                value={status ?? ''}
                onChange={(event) => handleStatusChange(event.target.value)}
              >
                {statusOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <label className={styles.field}>
              <span className={styles.fieldLabel}>Gender</span>
              <select
                className={styles.fieldControl}
                value={gender ?? ''}
                onChange={(event) => handleGenderChange(event.target.value)}
              >
                {genderOptions.map((option) => (
                  <option key={option.label} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            </label>

            <button className={styles.clearButton} type="button" onClick={clearFilters}>
              Clear filters
            </button>
          </div>

          <div className={styles.metaRow}>
            <div className={styles.metaCopy}>
              {query.isPending && !query.data
                ? 'Loading characters from the GraphQL API...'
                : `${characters.length} character${characters.length === 1 ? '' : 's'} loaded`}
            </div>

            <div className={styles.activeFilters}>
              {status ? <span className={styles.pill}>Status: {humanizeLabel(status)}</span> : null}
              {gender ? <span className={styles.pill}>Gender: {humanizeLabel(gender)}</span> : null}
              {(search ?? '').trim() ? <span className={styles.pill}>Search: {search}</span> : null}
              {!hasActiveFilters ? <span className={styles.pill}>Showing all records</span> : null}
            </div>
          </div>

          <div className={styles.statusBar}>
            {isBusy ? 'Refreshing results...' : 'Filters are synced to the URL with nuqs.'}
          </div>
        </section>

        {query.isError ? (
          <section className={styles.errorState}>
            <h2 className={styles.errorTitle}>The character feed could not be loaded.</h2>
            <p className={styles.errorCopy}>
              {query.error instanceof Error
                ? query.error.message
                : 'Please make sure the NestJS backend is running on the configured GraphQL URL.'}
            </p>
          </section>
        ) : null}

        {!query.isError && query.isPending && !query.data ? (
          <section className={styles.grid} aria-label="Loading characters">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className={styles.placeholderCard} />
            ))}
          </section>
        ) : null}

        {!query.isError && !query.isPending && characters.length === 0 ? (
          <section className={styles.emptyState}>
            <h2 className={styles.emptyTitle}>No characters matched those filters.</h2>
            <p className={styles.emptyCopy}>
              Try clearing one of the filters or searching for a different keyword
              to broaden the results.
            </p>
          </section>
        ) : null}

        {!query.isError && characters.length > 0 ? (
          <section className={styles.grid}>
            {characters.map((character) => {
              const statusTone =
                character.status === CharacterStatus.Alive
                  ? styles.badgeAlive
                  : character.status === CharacterStatus.Dead
                    ? styles.badgeDead
                    : styles.badgeUnknown;

              return (
                <article key={character.id} className={styles.card}>
                  <div className={styles.cardImageWrap}>
                    <Image
                      className={styles.cardImage}
                      src={character.image}
                      alt={character.name}
                      fill
                      sizes="(max-width: 680px) 100vw, (max-width: 960px) 50vw, 33vw"
                    />
                  </div>

                  <div className={styles.cardContent}>
                    <div className={styles.cardHeader}>
                      <h2 className={styles.cardName}>{character.name}</h2>
                      <div className={styles.badgeRow}>
                        <span className={`${styles.badge} ${statusTone}`}>
                          {humanizeLabel(character.status)}
                        </span>
                        <span className={`${styles.badge} ${styles.badgeUnknown}`}>
                          {humanizeLabel(character.gender)}
                        </span>
                      </div>
                    </div>

                    <p className={styles.cardDescription}>
                      {trimDescription(character.description)}
                    </p>
                  </div>
                </article>
              );
            })}
          </section>
        ) : null}
      </div>
    </main>
  );
}
