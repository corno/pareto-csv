import * as p_ from 'pareto-core/implementation/serializer'
import p_list_from_text from 'pareto-core/implementation/refiner/specials/list_from_text'

//schemas
import type * as s_in from "../../interface/schemas/csv.js"

namespace declarations {

    export type CSV = p_.Paragraph_Serializer_With_Parameter<
        s_in.CSV,
        {
            'separator': number
        }
    >
    export type Row = p_.Phrase_Serializer_With_Parameter<
        s_in.Row,
        {
            'separator': number
        }
    >
}

//shorthands
import * as sh from "pareto-fountain-pen/shorthands/prose_extended/deprecated"

export const CSV: declarations.CSV = ($, $p) => sh.pg.deprecated_composed(
    p_.literal.segmented_list([
        p_.from.optional($.header).decide(
            ($) => p_.literal.list([sh.pg.sentences([sh.sentence([Row($, $p)])])]),
            () => p_.literal.list([])
        ),
        p_.literal.list([
            sh.pg.sentences(
                p_.from.list($.rows).map(
                    ($) => sh.sentence([Row($, $p)])
                )
            )
        ])
    ])
)

export const Row: declarations.Row = ($, $p) => sh.ph.rich_phrase(
    p_.from.list($.cells).map(
        ($) => sh.ph.list_of_characters(
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
    sh.ph.list_of_characters(p_.literal.list([$p.separator])),
    sh.ph.nothing(),
)
