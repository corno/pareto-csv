import * as p_ from 'pareto-core/interface/data'

export type CSV = {
    'header': p_.Optional_Value<Row>
    'rows': p_.List<Row>
}

export type Rows = p_.List<Row>

export type Row = {
    'cells': p_.List<string>
}
