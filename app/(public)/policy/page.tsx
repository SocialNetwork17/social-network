import {LegalPage} from "@/widgets/legalPage/LegalPage";
import {policyData} from "@/shared/content/privacyPolicy";


export default function Policy() {
    return (
        <>
            <LegalPage title={policyData.title} description={policyData.description}/>
        </>
    );
}