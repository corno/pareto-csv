import * as p_ from 'pareto-core-shorthands/unconstrained_target'
import type * as p_di from 'pareto-core/interface/data'

import type * as s_target from "../../interface/schemas/csv.js"

export const CSV = (
    header: p_di.Optional_Value<s_target.Row>,
    rows: p_.Normal_List<s_target.Row>,
): s_target.CSV => ({
    'header': header,
    'rows': p_.list(rows),
})

export const row = (
    cells: p_.Normal_List<string>,
): s_target.Row => ({
    'cells': p_.list(cells),
})
