"use client"
/* eslint-disable @next/next/no-img-element */
import React from 'react';
import Head from 'next/head';
import { useGetSettingSertifkat } from '@/services/api';
import LoadingPage from '@/components/ui/LoadingPage';

const CertificateSetting: React.FC = () => {
    // Integrasi API
    const { data, isLoading } = useGetSettingSertifkat();
    if (isLoading) {
        return <div >
          <LoadingPage />
        </div>;
      }
    return (
        <>
            <Head>
                <title>Sertifikat</title>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <div className="wrap p-2">
                <div className="wrap-certi">
                    <div className="certificate">
                        <img className="logo" src="/assets/images/logo2.png" alt="Logo" />
                        <h1 className='font-semibold'>SERTIFIKAT</h1>
                        <p className="subheading font-medium mb-4">SELEKSI KOMPETENSI DASAR</p>
                        <p className="details mt-4 medium">NO: 182DHD9282HE82U28299</p>
                        <p className="berikan">Diberikan kepada:</p>
                        <div className="wrap-name">
                            <p className="name">Master Education</p>
                            <img className="garis" src="/assets/images/garis.png" alt="Garis" />
                        </div>
                        <p className="tanggal">Tanggal Ujian: 07 November 2024</p>
                        <div className="scores">
                            <table>
                                <tbody>
                                    <tr>
                                        <td>Tes Wawasan Kebangsaan</td>
                                        <td>:</td>
                                        <td>150</td>
                                    </tr>
                                    <tr>
                                        <td>Tes Intelegensia Umum</td>
                                        <td>:</td>
                                        <td>175</td>
                                    </tr>
                                    <tr>
                                        <td>Tes Karakteristik Pribadi</td>
                                        <td>:</td>
                                        <td>225</td>
                                    </tr>
                                    <tr>
                                        <td>
                                            <b>Total</b>
                                        </td>
                                        <td>:</td>
                                        <td>
                                            <b>550</b>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <p className="footer">
                            Bandar Lampung, 07 November 2024
                            <br />
                            {data?.data?.title ?? "Master Education"}
                        </p>
                        <div className="signature">
                            <div className="tanda">
                                <img src={data?.data?.sign ?? "/assets/images/signature.png"} alt="Tanda Tangan" />
                            </div>
                            <span className="nama-tanda">{data?.data?.name ?? "Nama"}</span>
                        </div>
                        <img className="pita" src="/assets/images/pita.png" alt="Pita" />
                    </div>
                </div>
                <img className="ribbon-top" src="/assets/images/ribbon-top.png" alt="Ribbon Top" />
                <img className="ribbon-down" src="/assets/images/ribbon-down.png" alt="Ribbon Down" />
            </div>
            <style jsx>{`
        body {
            font-family: 'serif';
            margin: 0;
            padding: 0;
            display: flex;
        }

        .wrap {
            position: relative;
            width: 1123px;
            background-color: #F8F8F8;
        }

        .wrap-certi {
            position: relative;
            margin: 40px;
            z-index: 5;
            padding: 30px;
            background-color: white;
        }

        .certificate {
            background: white;
            border: 3px solid #B8860E;
            padding: 20px;
            position: relative;
        }

        .certificate h1 {
            text-align: center;
            font-size: 42px;
            color: #4A055B;
            margin: 0;
            font-family: Georgia, 'Times New Roman', Times, serif;
        }

        .certificate .subheading {
            text-align: center;
            margin-top: -4px;
            font-size: 26px;
            font-family: Georgia, 'Times New Roman', Times, serif;
            color: #4A055B;
        }

        .certificate .details {
            margin-top: 20px;
            font-size: 16px;
            text-align: center;
            margin-top: -20px;
            line-height: 1.6;
            color: #333;
            font-family: 'Arial', sans-serif !important;

        }

        .certificate .details span {
            font-weight: bold;
        }

        .certificate .name {
            text-align: center;
            font-size: 38px;
            font-weight: 500;
            margin-top: 10px;
            margin-bottom: 0px;
            font-family: Georgia, 'Times New Roman', Times, serif;
        }

        .certificate .scores {
            width: 350px;
            margin: auto;
            margin-top: 20px;
            font-size: 16px;
            font-family: 'Arial', sans-serif !important;
        }

        .certificate .scores table {
            width: 100%;
            border-collapse: collapse;
        }

        .certificate .scores table td {
            padding: 8px 0;
        }

        .certificate .scores table td:first-child {
            text-align: left;
        }

        .certificate .scores table td:last-child {
            text-align: right;
        }

        .certificate .footer {
            font-family: 'Arial', sans-serif !important;
            font-weight: 700;
            margin-top: 30px;
            text-align: center;
            font-size: 16px;
        }

        .certificate .signature {
            display: flex;
            flex-direction: column;
            align-items: center;
            margin-top: 30px;
            text-align: right;
            padding-right: 20px;
            position: relative;
        }

        .certificate .signature img {
            width: 100px;
        }

        .certificate .signature span {
            display: inline-block;
            margin-top: 10px;
        }

        .ribbon-down {
            position: absolute;
            bottom: 0px;
            left: 0;
            width: 460px;
        }

        .ribbon-top {
            position: absolute;
            top: 0px;
            right: 0;
            width: 460px;
        }

        .logo {
            position: absolute;
            top: 10px;
            left: 10px;
            width: 150px;
        }

        .berikan {
            font-family: 'Arial', sans-serif !important;
            font-weight: 700;
            text-align: center;
            font-size: 16px;
            margin-top: 10px;
        }

        .wrap-name {
            position: relative;
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        .garis {
            width: 400px;
            margin: auto;
        }

        .tanggal {
            font-family: 'Arial', sans-serif !important;
            margin: auto;
            text-align: center;
            margin-top: 10px;
            font-size: 12px;
        }

        .tanda {
            height: 50px;
            width: 140px;
            display: flex;
            justify-content: center;
            align-items: center;
        }

        .tanda img {
            width: 100%;
            object-fit: contain;
        }

        .nama-tanda {
            font-family: 'Arial', sans-serif !important;
            margin: auto;
            font-weight: 700;
            text-align: center;
            margin-top: 10px;
            font-size: 18px;
        }

        .pita{
            position: absolute;
            right: 10px;
            bottom: 10px;
            width: 100px;
        }
      `}</style>
        </>
    );
};

export default CertificateSetting;
