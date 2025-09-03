'use client'

import React, { useState, useRef } from 'react';
import { Upload, FileText, Search } from 'lucide-react';

export default function EnhancedFileUpload() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [result, setResult] = useState(null);
    const [dragActive, setDragActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState(null);
    const fileInputRef = useRef(null);

    const handleUpload = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        
        // Simula l'upload - sostituisci con la tua logica
        setTimeout(() => {
            setResult([
                {
                    id: 1,
                    filePath: '/path/to/file.pdf',
                    sha1Hash: 'da39a3ee5e6b4b0d3255bfef95601890afd80709',
                    fileSize: '1.2 MB',
                    fileTimestamp: '2024-03-15 10:30:00'
                }
            ]);
            setLoading(false);
        }, 2000);
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            setSelectedFile(e.dataTransfer.files[0]);
        }
    };

    const handleFileSelect = (e) => {
        if (e.target.files && e.target.files[0]) {
            setSelectedFile(e.target.files[0]);
        }
    };

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className="p-6 max-w-3xl mx-auto font-mono min-h-screen bg-gradient-to-br from-slate-50 to-blue-50">
            <h1 className="text-3xl font-bold mb-8 text-center text-gray-800 flex items-center justify-center gap-3">
                <Search className="text-blue-600" />
                Cerca File per SHA-1
            </h1>

            <div className="mb-8">
                {/* Area Drag & Drop */}
                <div 
                    className={`relative overflow-hidden rounded-2xl border-3 border-dashed transition-all duration-300 ${
                        dragActive 
                            ? 'border-blue-500 bg-blue-50 scale-105' 
                            : 'border-gray-300 hover:border-blue-400'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                >
                    {/* Icona di upload come sfondo */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-10">
                        <Upload size={180} className="text-blue-500" />
                    </div>

                    {/* Contenuto principale */}
                    <div 
                        className={`relative p-12 text-center cursor-pointer transition-all duration-300 ${
                            dragActive ? 'bg-blue-50/50' : 'hover:bg-gray-50/50'
                        }`}
                        onClick={openFileDialog}
                    >
                        {/* Icona semplice */}
                        <div className="text-blue-500 mb-4">
                            <Upload size={48} />
                        </div>

                        {/* Testo principale */}
                        <div className="mt-6 space-y-2">
                            {selectedFile ? (
                                <div className="space-y-3">
                                    <div className="flex items-center justify-center gap-2 text-green-600">
                                        <FileText size={20} />
                                        <span className="font-semibold">{selectedFile.name}</span>
                                    </div>
                                    <p className="text-sm text-gray-500">
                                        {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                                    </p>
                                    <p className="text-sm text-blue-600 hover:text-blue-700 underline">
                                        Clicca per selezionare un altro file
                                    </p>
                                </div>
                            ) : (
                                <>
                                    <h3 className="text-xl font-semibold text-gray-700">
                                        {dragActive ? 'Rilascia il file qui!' : 'Trascina il tuo file qui'}
                                    </h3>
                                    <p className="text-gray-500">
                                        oppure <span className="text-blue-600 hover:text-blue-700 underline">clicca per selezionare</span>
                                    </p>
                                    <p className="text-xs text-gray-400 mt-4">
                                        Supportati tutti i tipi di file
                                    </p>
                                </>
                            )}
                        </div>

                        {/* Indicatori visivi */}
                        <div className="absolute top-4 right-4">
                            <div className={`w-3 h-3 rounded-full transition-colors ${
                                selectedFile ? 'bg-green-400' : 'bg-gray-300'
                            }`}></div>
                        </div>
                    </div>

                    {/* Input nascosto */}
                    <input 
                        ref={fileInputRef}
                        type="file" 
                        onChange={handleFileSelect}
                        className="hidden"
                        required 
                    />
                </div>

                {/* Pulsante di invio */}
                <button 
                    onClick={handleUpload}
                    disabled={!selectedFile || loading}
                    className={`w-full mt-6 py-4 px-6 rounded-xl font-semibold text-white transition-all duration-300 ${
                        !selectedFile || loading
                            ? 'bg-gray-400 cursor-not-allowed' 
                            : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:shadow-xl transform hover:-translate-y-1'
                    }`}
                >
                    {loading ? (
                        <div className="flex items-center justify-center gap-3">
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            Elaborazione in corso...
                        </div>
                    ) : (
                        <div className="flex items-center justify-center gap-2">
                            <Search size={20} />
                            Carica & Cerca
                        </div>
                    )}
                </button>
            </div>

            {/* Messaggi di errore */}
            {error && (
                <div className="bg-red-50 border-l-4 border-red-400 p-4 rounded-lg mb-6">
                    <div className="flex">
                        <div className="text-red-700">
                            <strong>Errore:</strong> {error}
                        </div>
                    </div>
                </div>
            )}

            {/* Risultati */}
            {result && (
                <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                    <div className="bg-gradient-to-r from-green-500 to-blue-500 px-6 py-4">
                        <h2 className="text-xl font-semibold text-white">Risultati della ricerca</h2>
                    </div>
                    
                    <div className="p-6">
                        {result.length === 0 ? (
                            <div className="text-center py-8 text-gray-500">
                                <FileText size={48} className="mx-auto mb-4 opacity-50" />
                                <p>Nessun file trovato con questo hash.</p>
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full text-sm">
                                    <thead>
                                        <tr className="border-b-2 border-gray-200">
                                            <th className="text-left p-3 font-semibold text-gray-700">Percorso</th>
                                            <th className="text-left p-3 font-semibold text-gray-700">SHA1</th>
                                            <th className="text-right p-3 font-semibold text-gray-700">Dimensione</th>
                                            <th className="text-left p-3 font-semibold text-gray-700">Data</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {result.map((f, index) => (
                                            <tr key={f.id} className={`border-b border-gray-100 hover:bg-gray-50 transition-colors ${
                                                index % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                                            }`}>
                                                <td className="p-3 text-blue-600 font-mono text-xs">{f.filePath}</td>
                                                <td className="p-3 font-mono text-xs text-gray-600">{f.sha1Hash}</td>
                                                <td className="p-3 text-right font-semibold">{f.fileSize}</td>
                                                <td className="p-3 text-gray-600">{f.fileTimestamp}</td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
}