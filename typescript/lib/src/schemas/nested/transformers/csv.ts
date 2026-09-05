import * as p_ from 'pareto-core/transformer'

import * as s_in from "../schema.js"
import * as s_out from "../../csv/schema.js"

    export const Leaf_Dictionary: p_.Transformer<
        s_in.Leaf_Dictionary,
        s_out.Rows
    > = ($) => p_.from.dictionary($).convert_to_list(
        ($, id): s_out.Row => ({
            'cells': p_.literal.segmented_list([
                p_.literal.list([id]),
                $.cells,
            ])
        })
    )

    export const Composed_Dictionary: p_.Transformer<
        s_in.Composed_Dictionary,
        s_out.Rows
    > = ($) => p_.from.dictionary($).flatten_to_list(
        ($, id): s_out.Rows => p_.from.list(
            p_.from.state($).decide(
                ($): s_out.Rows => {
                    switch ($[0]) {
                        case 'composed': return p_.option($, ($) => Composed_Dictionary($))
                        case 'leaf': return p_.option($, ($) => Leaf_Dictionary($))
                        default: return p_.exhaustive($[0])
                    }
                }
            )
        ).map(
            ($) => ({
                'cells': p_.literal.segmented_list([
                    p_.literal.list([id]),
                    $.cells,
                ])
            })
        )
    )