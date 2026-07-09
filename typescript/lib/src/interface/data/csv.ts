import * as p_ from 'pareto-core/interface/data'

export type CSV = {
    'rows': p_.List<Row>
}

export type Row = {
    'cells': p_.List<string>
}
