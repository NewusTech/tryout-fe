import React from 'react';

const MapsHome = () => {
    return (
        <div className="container mx-auto py-16">
            <div className="font-semibold text-2xl">Lokasi</div>
            <div className="mt-2">
                Jl. Way Semangka No.59, Pahoman, Kec. Tlk. Betung Utara, Kota Bandar Lampung, Lampung 35228
            </div>
            <div className="mt-4">
                <iframe
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d5518.158215905227!2d105.26992451183926!3d-5.442354754272004!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e40dbff9e63c95f%3A0x6bd3c394975d3800!2sCV.%20NEWUS%20TEKNOLOGI!5e1!3m2!1sid!2sid!4v1733555121091!5m2!1sid!2sid"
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
