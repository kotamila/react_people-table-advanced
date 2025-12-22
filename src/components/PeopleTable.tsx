/* eslint-disable jsx-a11y/control-has-associated-label */
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Person } from '../types';

interface Props {
  people: Person[];
  onSortChange: (field: string) => void;
  currentSort: string | null;
  currentOrder: string | null;
}

const SortIcon = ({
  field,
  currentSort,
  currentOrder,
}: {
  field: string;
  currentSort: string | null;
  currentOrder: string | null;
}) => {
  if (currentSort !== field) {
    return <i className="fas fa-sort" />;
  }

  if (currentOrder !== 'desc') {
    return <i className="fas fa-sort-down" />;
  }

  return <i className="fas fa-sort-up" />;
};

export const PeopleTable: React.FC<Props> = ({
  people,
  onSortChange,
  currentSort,
  currentOrder,
}) => {
  const { search } = useLocation();

  const renderLinkOrText = (
    person: Person | null,
    field: 'mother' | 'father',
  ): JSX.Element | string => {
    const data = person?.[field];

    if (data && typeof data === 'object' && data.id) {
      return (
        <Link to={{ pathname: `/people/${data.slug || data.id}`, search }}>
          {data.name}
        </Link>
      );
    }

    if (typeof data === 'object' && data !== null) {
      return data.name || '-';
    }

    return data || '-';
  };

  const renderSortHeader = (field: string, title: string) => (
    <th>
      <span className="is-flex is-flex-wrap-nowrap">
        {title}
        <a onClick={() => onSortChange(field)} className="has-text-danger">
          <span className="icon">
            <SortIcon
              field={field}
              currentSort={currentSort}
              currentOrder={currentOrder}
            />
          </span>
        </a>
      </span>
    </th>
  );

  return (
    <table
      data-cy="peopleTable"
      className="table is-striped is-hoverable is-narrow is-fullwidth"
    >
      <thead>
        <tr>
          {renderSortHeader('name', 'Name')}
          {renderSortHeader('sex', 'Sex')}
          {renderSortHeader('born', 'Born')}
          {renderSortHeader('died', 'Died')}
          <th>Mother</th>
          <th>Father</th>
        </tr>
      </thead>

      <tbody>
        {people.map(person => (
          <tr
            data-cy="person"
            key={person.id}
            className={person.sex === 'f' ? 'has-text-danger' : ''}
          >
            <td>
              <Link
                to={{ pathname: `/people/${person.slug || person.id}`, search }}
              >
                {person.name}
              </Link>
            </td>
            <td>{person.sex}</td>
            <td>{person.born}</td>
            <td>{person.died}</td>
            <td>{renderLinkOrText(person, 'mother')}</td>
            <td>{renderLinkOrText(person, 'father')}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};
