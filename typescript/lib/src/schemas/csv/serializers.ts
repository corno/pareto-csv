import * as p_ from 'pareto-core/serializer'
import p_list_from_text from 'pareto-core/refiner/specials/list_from_text'

import * as s_in from "./schema.js"

export const Cell: p_.Serializer<s_in.Cell> = ($) => p_.ph.list_of_characters(
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