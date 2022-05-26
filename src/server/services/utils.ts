import _ from 'lodash';
import { sql, ValueExpression } from 'slonik';

export const patch = (columns: { [name: string]: ValueExpression | undefined }) => {
  const columnsToUpdate = _.chain(columns)
    .map((val, key) => {
      if (_.isUndefined(val)) {
        return undefined;
      }

      return sql`${sql.identifier([key])} = ${val}`;
    })
    .compact()
    .value();

  const fragment =
    columnsToUpdate.length > 1 ? sql.join(columnsToUpdate, sql`, `) : columnsToUpdate[0];

  return sql`${fragment}`;
};
