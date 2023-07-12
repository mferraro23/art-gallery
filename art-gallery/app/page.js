'use client'
import React, { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import './styles/gallery.css';

export default function Gallery() {
    const images = Array(30).fill('/pictures/1.jpg');
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedImage, setSelectedImage] = useState(null);
    const itemsPerPage = 9;
    const totalPages = Math.ceil(images.length / itemsPerPage);

    function handlePageChange(event) {
        setCurrentPage(Number(event.target.dataset.page));
    }

    function handleImageClick(index, event) {
        event.stopPropagation();
        setSelectedImage(index);
    }

    function closeFullscreen() {
        setSelectedImage(null);
    }

    function handleFormClick(event) {
        event.stopPropagation();
    }

    return (
        <body>
            <header>
                <h1>Alice Morris</h1>
            </header>
            <div className="grid">
                {images.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage).map((img, index) => (
                    <motion.div key={index} className="card" layoutId={`card-${index}`} onClick={(event) => handleImageClick(index, event)}>
                        <div className="image-container">
                            <Image src={img} width={500} height={500} alt="Artwork" />
                        </div>
                        <div className="card-info" onClick={handleFormClick}>
                            <div className="hover-text">
                                <p>Hover for more</p>
                            </div>
                            <div className="full-description">
                                <h3>Artwork Title</h3>
                                <form>
                                    <label for="name">Name:</label>
                                    <input type="text" id="name" name="name" required />
                                    <label for="email">Email:</label>
                                    <input type="email" id="email" name="email" required />
                                    <label for="phone">Phone:</label>
                                    <input type="tel" id="phone" name="phone" required />
                                    <input type="submit" value="Submit" />
                                </form>
                            </div>
                        </div>
                    </motion.div>
                ))}
            </div>
            {selectedImage !== null && (
                <motion.div className="fullscreen" layoutId={`card-${selectedImage}`} onClick={closeFullscreen}>
                    <div className="card">
                        <div className="image-container">
                            <Image src={images[selectedImage]} width={1000} height={1000} alt="Artwork" />
                        </div>
                        <div className="card-info">
                            <h3>Artwork Title</h3>
                            <form onClick={handleFormClick}>
                                <label for="name">Name:</label>
                                <input type="text" id="name" name="name" required />
                                <label for="email">Email:</label>
                                <input type="email" id="email" name="email" required />
                                <label for="phone">Phone:</label>
                                <input type="tel" id="phone" name="phone" required />
                                <input type="submit" value="Submit" />
                            </form>
                        </div>
                    </div>
                </motion.div>
            )}
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
