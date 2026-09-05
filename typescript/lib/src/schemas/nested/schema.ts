import type * as p_ from 'pareto-core/schema'

import type * as s_out from "pareto-csv/schemas/csv/schema"

export type Leaf_Dictionary = p_.Dictionary<s_out.Row>

export type Composed_Dictionary = p_.Dictionary<Dictionary>

export type Dictionary =
    | ['leaf', Leaf_Dictionary]
    | ['composed', Composed_Dictionary]
