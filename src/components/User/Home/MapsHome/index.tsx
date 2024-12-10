import { useGetAboutCompany } from '@/services/api';
import React from 'react';

const MapsHome = () => {
    const { data, isLoading } = useGetAboutCompany();
    return (
        <div className="container mx-auto py-16">
            <div className="font-semibold text-2xl">Lokasi</div>
            <div className="mt-2">
                {data?.data?.address ?? "-"}
            </div>
            <div className="mt-4">
                <iframe
                    src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5518.2932115991!2d${data?.data?.long ?? "105.2677365118392"}!3d${data?.data?.lat ?? "-5.4276227541560065"}!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40db0052bcbb1d%3A0xd862d84ff8dc9c6e!2sMaster%20Education!5e1!3m2!1sid!2sid!4v1733800927832!5m2!1sid!2sid`}
                    width="100%"
                    height="450"
                    style={{ border: 0 }}
                    allowFullScreen
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                />

            </div>
        </div>
    );
};

export default MapsHome;
