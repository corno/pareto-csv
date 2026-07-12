import * as p_ from 'pareto-core/implementation/transformer'
import type * as p_i from 'pareto-core/interface/transformer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//schemas
import type * as s_in from "../../../interface/schemas/csv.js"

import type * as s_out from "../../../interface/schemas/prose.js"
namespace declarations {

    export type CSV = p_i.Transformer_With_Parameter<
        s_in.CSV,
        s_out.Paragraph,
        {
            'separator': number
        }
    >
    export type Row = p_i.Transformer_With_Parameter<
        s_in.Row,
        s_out.Sentence,
        {
            'separator': number
        }
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose/deprecated"

export const CSV: declarations.CSV = ($, $p) => sh.pg.deprecated_composed(
    p_.literal.segmented_list([
        p_.from.optional($.header).decide(
            ($) => p_.literal.list([sh.pg.sentences([Row($, $p)])]),
            () => p_.literal.list([])
        ),
        p_.literal.list([
            sh.pg.sentences(
                p_.from.list($.rows).map(
                    ($) => Row($, $p)
                )
            )
        ])
    ])
)

export const Row: declarations.Row = ($, $p) => sh.sentence([
    sh.ph.rich(
        p_.from.list($.cells).map(
            ($) => sh.ph.serialize(
                p_.literal.segmented_list([
                    p_.literal.list([
                        0x22, //"
                    ]),
                    p_.from.list(p_list_from_text(
                        $,
                        ($) => $ === 0x22 //"
                            ? p_.literal.list([0x22, 0x22]) //escape "
                            : p_.literal.list([$]),
                    ),
                    ).flatten(
                        ($) => $
                    ),
                    p_.literal.list([
                        0x22, //"
                    ])
                ])
            )
        ),
        sh.ph.nothing(),
        sh.ph.nothing(),
        sh.ph.serialize(p_.literal.list([$p.separator])),
        sh.ph.nothing(),
    )
])


