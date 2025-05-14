import React from "react";
import { useParams } from "react-router-dom";

const serviceDetails = {
    crop: { title: "Crop Recommendation", content: "Details about crop recommendations..." },
    fertilizer: { title: "Fertilizer Recommendation", content: "Details about fertilizer recommendations..." },
    //cropdisease: { title: "Crop Disease", content: "Details about crop disease identification and cure..." }
};

const ServiceDetails = () => {
    const { serviceId } = useParams();
    const service = serviceDetails[serviceId];

    if (!service) {
        return <h2>Service Not Found</h2>;
    }

    return (
        <div className="container">
            <h2>{service.title}</h2>
            <p>{service.content}</p>
        </div>
    );
};

export default ServiceDetails;
