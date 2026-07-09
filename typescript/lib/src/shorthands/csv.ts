import * as p_ from 'pareto-core-shorthands/unconstrained_target'

import type * as d_target from "../interface/data/csv.js"

export const CSV = (
    rows: p_.Normal_List<d_target.Row>,
): d_target.CSV => ({
    'rows': p_.list(rows),
})

export const row = (
    cells: p_.Normal_List<string>,
): d_target.Row => ({
    'cells': p_.list(cells),
})
