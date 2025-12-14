import {LegalPage} from "@/widgets/legalPage/LegalPage";
import {serviceData} from "@/shared/content/termsOfService";


export default function Service() {
    return (
        <>
            <LegalPage title={serviceData.title} description={serviceData.description}/>
        </>
    );
}