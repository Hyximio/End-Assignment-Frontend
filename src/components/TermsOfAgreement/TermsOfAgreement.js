import React from "react";

import './TermsOfAgreement.css';

function TermsOfAgreement( {} ) {

    const terms =[
        "Never go out of the house without having drunk a beer",
        "Every morning look in the mirror and say to yourself 'The best beer is an open beer'!",
        "You're not allowed to use words 'soda' and 'water'. Those words need to be replaced by 'beer'",
        "You never explain to people why you're behaving the way you do because of these agreement",
        "Any damage caused by this agreement is your own responsibility"
    ]

    let count = 1
    const agreementLines = terms.map( (agreement) =>
        <div key={agreement.split(" ") + count} className="agreement-box">
            <br/>
            <p>{count++}. {agreement}</p>
        </div>
    )

    return (
        <>
            {agreementLines}
        </>
    )
}

export default TermsOfAgreement;