// Gallery.js
'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import './styles/gallery.css';

export default function Gallery() {
    const images = Array(30).fill('/pictures/1.jpg')
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(images.length / itemsPerPage);

    function handlePageChange(event) {
        setCurrentPage(Number(event.target.dataset.page));
    }

    return (
        <body>
            <header>
                <h1>Alice Morris</h1>
            </header>
            <div className="grid">
                {images.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((img, index) => (
                    <div key={index} className="card">
                        <Image src={img} width={500} height={500} alt="Artwork" />
                        <div className="card-info">
                            <p className="hover-text">Hover for more</p>
                            <div className="full-description">
                                <h3>Artwork Title</h3>
                                <p>Description of the artwork...</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="pagination">
                {[...Array(totalPages).keys()].map((page) => (
                    <button key={page} data-page={page + 1} onClick={handlePageChange}>
                        {page + 1}
                    </button>
                ))}
            </div>
        </body>
    );
}
