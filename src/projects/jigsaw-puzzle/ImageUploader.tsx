import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './ImageUploader.scss';

interface PuzzlePiece {
    image: string;
    index: number;
    solved: boolean;
}

const ImageUploader = () => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [puzzlePieces, setPuzzlePieces] = useState([]);
    
    let targetElement = null;

    const handleImageUpload = async (event) => {
        setSelectedImage(null);
        setPuzzlePieces([]);
        const file = event.target.files[0];
        const reader = new FileReader();

        reader.onload = async () => {
            setSelectedImage(reader.result);
            await processImage(file);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const processImage = async (file) => {
        try {
            const formData = new FormData();
            formData.append('image', file);

            const response = await axios.post('/jigsaw-upload', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const { pieces } = response.data as { pieces: Array<String> };
            const puzzlePieces: PuzzlePiece[] = pieces.map((p, index) => { return { image: p, index, solved: false } as PuzzlePiece })
            setTimeout(() => setPuzzlePieces(puzzlePieces), 1200);
        } catch (error) {
            console.error('Error uploading image:', error);
        }
    };

    const getStartingPosition = () => {
        const maxWidth = (document.documentElement.clientWidth *.85) - 110;

        const minX = 10;
        const minY = document.documentElement.clientHeight - 350;

        const x = Math.floor(Math.max(minX, Math.random() * maxWidth));
        const y = Math.floor(minY + Math.random() * 150);

        return {x, y}
    }

    const PuzzlePiece = ({ piece }: { piece: PuzzlePiece }) => {

        const [position, setPosition] = useState(getStartingPosition());
        const [dragStartPos, setDragStartPos] = useState(null);

        const handleDrag = (event: React.DragEvent, index: number) => {
            setDragStartPos({x: event.clientX, y: event.clientY});
        }

        // const handleDragStart = (event: React.MouseEvent<HTMLElement>) => {
        //     document.onmousemove = e => handleDragImage(e, event.target as HTMLElement, event.clientX, event.clientY);
        // }

        const handleDragEnd = (event: React.MouseEvent<HTMLElement>, piece: PuzzlePiece) => {
            const element = event.target as HTMLElement;
            let xDelta, yDelta;
            if (targetElement?.index === piece.index) {
                console.warn("Hooray! You placed the piece!", targetElement);
            }
            xDelta = event.clientX - dragStartPos.x;
            yDelta = event.clientY - dragStartPos.y;
            element.style.top = `${position.y + yDelta}px`;
            element.style.left = `${position.x + xDelta}px`;

            setDragStartPos(null);
            setPosition({ x: parseInt(element.style.left), y: parseInt(element.style.top) });
            document.onmousemove = null;

        }

        useEffect(() => {
            document.onmouseup = () => {
                document.onmousemove = null;
            }

            return () => document.onmouseup = null;
        }, [])

        return <img
            key={piece.index}
            src={`data:image/jpeg;base64,${piece.image}`}
            alt={`Puzzle Piece ${piece.index}`}
            className={"puzzle-piece"}
            onDoubleClick={() => solvePiece(piece)}
            //onMouseDown={handleDragStart}
            onDragStart={e => handleDrag(e, piece.index)}
            onDragEnd={e => handleDragEnd(e, piece)}
            style={{ top: position.y, left: position.x }}
        />
    }

    const RenderPuzzlePieces = () => {
        return <>
            {puzzlePieces.map(piece => (
                <PuzzlePiece piece={piece} />
            ))}
        </>
    };

    const PiecePlaceholder = ({index}: {index: number}) => {

        const handleDragOver = (e: React.DragEvent) => {
            targetElement = {el: e.target, index}
        }

        return <div 
            className="piece-placeholder" 
            key={index}
            onDragOver={handleDragOver}
            ></div>
    }

    const PuzzleGame = () => {

        return (
            puzzlePieces.length > 0 ?
                <div className="game-container">
                    <div className="solution-container">
                        {puzzlePieces.map((p, idx) => {
                            return <PiecePlaceholder index={idx} />
                        })}
                    </div>
                    <RenderPuzzlePieces />
                </div>
                :
                null
        )
    }

    function solvePiece(piece: PuzzlePiece) {
        const newPieces = [...puzzlePieces]
        piece.solved = !piece.solved;
        newPieces[piece.index] = Object.assign({}, piece);
        setPuzzlePieces(newPieces);
    }

    return (
        <div className="container" onDragOver={e => e.preventDefault()}>
            <div className="upload-container">
                <h2 className="heading">Image Uploader</h2>
                <div className="upload-button">
                    <label htmlFor="upload-input" className="upload-label">
                        Select an image to upload
                    </label>
                    <input
                        type="file"
                        id="upload-input"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                </div>
            </div>
            {selectedImage && puzzlePieces.length === 0 && (
                <div className="image-preview">
                    <h3 className="preview-heading">Uploaded Image:</h3>
                    <img src={selectedImage} alt="Uploaded" className="preview-image" />
                </div>
            )}
            <PuzzleGame />
        </div>
    );
};

export default ImageUploader;