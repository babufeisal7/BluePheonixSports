import React, { useState, useCallback, useMemo, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { FiUpload, FiX, FiImage, FiTrash2, FiRotateCw, FiSearch, FiGrid, FiList, FiEdit2, FiDownload, FiShare2, FiTag, FiPlus, FiFilm } from 'react-icons/fi';
import { motion, AnimatePresence } from 'framer-motion';
import ReactPlayer from 'react-player';

const GalleryUpload = () => {
  // State management
  const [files, setFiles] = useState([]);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedItem, setSelectedItem] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid');
  const [tags, setTags] = useState(['Product', 'Event', 'Team', 'Marketing']);
  const [selectedTags, setSelectedTags] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [newTag, setNewTag] = useState('');
  const [sortBy, setSortBy] = useState('date');
  const [editData, setEditData] = useState({
    title: '',
    description: '',
    tags: []
  });

  // Format helpers
  const formatFileSize = (bytes) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatDate = (timestamp) => {
    return new Date(timestamp).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Handle file drops
  const onDrop = useCallback((acceptedFiles) => {
    const newFiles = acceptedFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      type: file.type.startsWith('video/') ? 'video' : 'image',
      file,
      url: URL.createObjectURL(file),
      title: file.name,
      description: '',
      size: file.size,
      uploadDate: file.lastModified,
      tags: []
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp', '.gif'],
      'video/*': ['.mp4', '.mov', '.avi', '.webm']
    },
    maxFiles: 20,
    maxSize: 50 * 1024 * 1024 // 50MB
  });

  // Media operations
  const deleteItem = useCallback((id) => {
    setFiles(prev => prev.filter(file => file.id !== id));
    if (selectedItem?.id === id) {
      setSelectedItem(null);
    }
  }, [selectedItem]);

  const clearAll = useCallback(() => {
    setFiles([]);
    setSelectedItem(null);
  }, []);

  const simulateUpload = useCallback(() => {
    setIsUploading(true);
    setUploadProgress(0);
    
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsUploading(false);
          return 100;
        }
        return prev + (Math.random() * 15 + 5);
      });
    }, 500);

    return () => clearInterval(interval);
  }, []);

  // Tag management
  const addTag = useCallback(() => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags(prev => [...prev, newTag.trim()]);
      setNewTag('');
    }
  }, [newTag, tags]);

  const toggleTag = useCallback((tag) => {
    setSelectedTags(prev => 
      prev.includes(tag) 
        ? prev.filter(t => t !== tag) 
        : [...prev, tag]
    );
  }, []);

  // Edit functionality
  const startEditing = useCallback((item) => {
    setSelectedItem(item);
    setEditData({
      title: item.title,
      description: item.description || '',
      tags: [...(item.tags || [])]
    });
  }, []);

  const saveEdit = useCallback(() => {
    setFiles(prev =>
      prev.map(item =>
        item.id === selectedItem.id
          ? { ...item, ...editData }
          : item
      )
    );
    setSelectedItem(prev => ({ ...prev, ...editData }));
    setEditData({
      title: '',
      description: '',
      tags: []
    });
  }, [selectedItem, editData]);

  const cancelEdit = useCallback(() => {
    setEditData({
      title: '',
      description: '',
      tags: []
    });
  }, []);

  // Filter and sort media
  const filteredFiles = useMemo(() => {
    return files
      .filter(file => 
        file.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        (selectedTags.length === 0 || selectedTags.some(tag => file.tags?.includes(tag)))
      )
      .sort((a, b) => {
        if (sortBy === 'name') return a.title.localeCompare(b.title);
        if (sortBy === 'size') return a.size - b.size;
        return b.uploadDate - a.uploadDate;
      });
  }, [files, searchQuery, selectedTags, sortBy]);

  // Clean up object URLs
  useEffect(() => {
    return () => {
      files.forEach(file => {
        if (file.file && file.url) {
          URL.revokeObjectURL(file.url);
        }
      });
    };
  }, [files]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="mb-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Media Gallery</h1>
          <p className="mt-2 text-lg text-gray-600">
            {files.length > 0 
              ? `${files.length} media items` 
              : 'Upload and manage your media'}
          </p>
        </div>
        
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="relative flex-grow sm:w-64">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search media..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4 py-2 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            onClick={() => setViewMode(viewMode === 'grid' ? 'list' : 'grid')}
            className="p-2 rounded-lg bg-white border border-gray-300 hover:bg-gray-100"
          >
            {viewMode === 'grid' ? <FiList /> : <FiGrid />}
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-6">
          {/* Upload Card */}
          <div 
            {...getRootProps()} 
            className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors cursor-pointer ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-400 bg-white'
            }`}
          >
            <input {...getInputProps()} />
            <div className="flex flex-col items-center justify-center space-y-3">
              <FiUpload className="h-12 w-12 text-gray-400" />
              {isDragActive ? (
                <p className="text-lg font-medium text-blue-600">Drop your files here</p>
              ) : (
                <>
                  <p className="text-lg font-medium text-gray-700">
                    Drag & drop files here, or click to select
                  </p>
                  <p className="text-sm text-gray-500">
                    Supports images (JPEG, PNG, WEBP, GIF) and videos (MP4, MOV, AVI, WEBM)
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Upload Progress */}
          {isUploading && (
            <div className="bg-white rounded-lg shadow p-4">
              <div className="flex justify-between mb-2">
                <span className="text-sm font-medium text-gray-700">
                  Uploading {files.length} items...
                </span>
                <span className="text-sm font-medium text-gray-700">
                  {uploadProgress}%
                </span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div 
                  className="bg-blue-600 h-2.5 rounded-full" 
                  style={{ width: `${uploadProgress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Media Gallery */}
          {files.length > 0 && (
            <div className="space-y-4">
              {/* Gallery Controls */}
              <div className="bg-white rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg ${viewMode === 'grid' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <FiGrid />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg ${viewMode === 'list' ? 'bg-blue-100 text-blue-600' : 'text-gray-500 hover:bg-gray-100'}`}
                  >
                    <FiList />
                  </button>
                </div>
                
                <div className="flex items-center space-x-3">
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="text-sm rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                  >
                    <option value="date">Sort by date</option>
                    <option value="name">Sort by name</option>
                    <option value="size">Sort by size</option>
                  </select>
                  
                  <button
                    onClick={simulateUpload}
                    disabled={isUploading}
                    className={`px-4 py-2 rounded-lg flex items-center space-x-2 ${
                      isUploading
                        ? 'bg-blue-400 cursor-not-allowed'
                        : 'bg-blue-600 hover:bg-blue-700'
                    } text-white shadow-sm`}
                  >
                    {isUploading ? (
                      <>
                        <FiRotateCw className="animate-spin" />
                        <span>Uploading...</span>
                      </>
                    ) : (
                      <>
                        <FiUpload />
                        <span>Upload All</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Tags Filter */}
              <div className="bg-white rounded-xl shadow-sm p-4">
                <div className="flex flex-wrap items-center gap-2">
                  {tags.map(tag => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1 rounded-full text-sm flex items-center space-x-1 ${
                        selectedTags.includes(tag)
                          ? 'bg-blue-100 text-blue-800 border border-blue-200'
                          : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                      }`}
                    >
                      <FiTag size={14} />
                      <span>{tag}</span>
                    </button>
                  ))}
                  {isEditing ? (
                    <div className="flex items-center space-x-2">
                      <input
                        type="text"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        placeholder="New tag"
                        className="text-sm px-2 py-1 border rounded"
                      />
                      <button
                        onClick={addTag}
                        className="p-1 text-blue-600 hover:text-blue-800"
                      >
                        <FiPlus />
                      </button>
                      <button
                        onClick={() => setIsEditing(false)}
                        className="p-1 text-gray-500 hover:text-gray-700"
                      >
                        <FiX />
                      </button>
                    </div>
                  ) : (
                    <button
                      onClick={() => setIsEditing(true)}
                      className="p-1 text-gray-500 hover:text-gray-700"
                    >
                      <FiPlus /> Add tag
                    </button>
                  )}
                </div>
              </div>

              {/* Media Grid */}
              {filteredFiles.length === 0 ? (
                <div className="bg-white rounded-xl shadow-sm p-8 text-center">
                  <FiSearch className="mx-auto h-12 w-12 text-gray-400" />
                  <h3 className="mt-2 text-lg font-medium text-gray-900">No media found</h3>
                  <p className="mt-1 text-gray-500">
                    Try adjusting your search or filter criteria
                  </p>
                </div>
              ) : viewMode === 'grid' ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredFiles.map((file) => (
                    <div
                      key={file.id}
                      className={`relative group rounded-xl overflow-hidden border ${
                        selectedItem?.id === file.id 
                          ? 'ring-2 ring-blue-500 border-blue-500' 
                          : 'border-gray-200 hover:border-blue-300'
                      } bg-white shadow-sm`}
                      onClick={() => setSelectedItem(file)}
                    >
                      <div className="aspect-square bg-gray-100 flex items-center justify-center relative">
                        {file.type === 'image' ? (
                          <img
                            src={file.url}
                            alt={file.title}
                            className="w-full h-full object-cover"
                            loading="lazy"
                          />
                        ) : (
                          <>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FiFilm className="h-12 w-12 text-gray-400" />
                            </div>
                            <ReactPlayer
                              url={file.url}
                              width="100%"
                              height="100%"
                              light={false}
                              controls={false}
                              playing={false}
                            />
                          </>
                        )}
                        <div className="absolute top-2 left-2 bg-black/70 text-white text-xs px-1.5 py-0.5 rounded">
                          {file.type.toUpperCase()}
                        </div>
                      </div>
                      
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 transition-all flex items-center justify-center opacity-0 group-hover:opacity-100 space-x-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteItem(file.id);
                          }}
                          className="p-2 bg-red-500 rounded-full text-white hover:bg-red-600 shadow-md"
                        >
                          <FiTrash2 size={16} />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            startEditing(file);
                          }}
                          className="p-2 bg-blue-500 rounded-full text-white hover:bg-blue-600 shadow-md"
                        >
                          <FiEdit2 size={16} />
                        </button>
                      </div>
                      
                      <div className="p-2 bg-gradient-to-t from-black/70 to-transparent absolute bottom-0 left-0 right-0">
                        <p className="text-xs text-white truncate">{file.title}</p>
                        <div className="flex justify-between items-center mt-1">
                          <span className="text-xs text-white/80">
                            {formatFileSize(file.size)}
                          </span>
                          {file.tags?.length > 0 && (
                            <span className="text-xs bg-white/20 text-white px-1 rounded">
                              {file.tags.length} tag{file.tags.length !== 1 ? 's' : ''}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                  <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                      <tr>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Preview
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Title
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Type
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Size
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Date
                        </th>
                        <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                          Actions
                        </th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                      {filteredFiles.map((file) => (
                        <tr 
                          key={file.id} 
                          className={`hover:bg-gray-50 cursor-pointer ${
                            selectedItem?.id === file.id ? 'bg-blue-50' : ''
                          }`}
                          onClick={() => setSelectedItem(file)}
                        >
                          <td className="px-6 py-4 whitespace-nowrap">
                            <div className="flex-shrink-0 h-10 w-10">
                              {file.type === 'image' ? (
                                <img
                                  src={file.url}
                                  alt={file.title}
                                  className="h-10 w-10 object-cover rounded"
                                />
                              ) : (
                                <div className="h-10 w-10 flex items-center justify-center bg-gray-100 rounded">
                                  <FiFilm className="text-gray-400" />
                                </div>
                              )}
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="text-sm font-medium text-gray-900">{file.title}</div>
                            {file.description && (
                              <div className="text-sm text-gray-500 truncate max-w-xs">{file.description}</div>
                            )}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              file.type === 'image' ? 'bg-green-100 text-green-800' : 'bg-purple-100 text-purple-800'
                            }`}>
                              {file.type.toUpperCase()}
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatFileSize(file.size)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                            {formatDate(file.uploadDate)}
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-2">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                startEditing(file);
                              }}
                              className="text-blue-600 hover:text-blue-900"
                            >
                              <FiEdit2 />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                deleteItem(file.id);
                              }}
                              className="text-red-600 hover:text-red-900"
                            >
                              <FiTrash2 />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar - Details/Edit Panel */}
        <div className="lg:col-span-1 space-y-6">
          {selectedItem && (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden sticky top-6 border border-gray-200">
              <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                <h3 className="font-medium text-gray-900">
                  {editData.title ? 'Edit Media' : 'Media Details'}
                </h3>
                <button
                  onClick={() => {
                    setSelectedItem(null);
                    cancelEdit();
                  }}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <FiX size={20} />
                </button>
              </div>
              
              <div className="p-4">
                <div className="mb-4 rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
                  {selectedItem.type === 'image' ? (
                    <img
                      src={selectedItem.url}
                      alt={selectedItem.title}
                      className="w-full h-48 object-contain"
                    />
                  ) : (
                    <div className="w-full h-48 flex items-center justify-center relative">
                      <ReactPlayer
                        url={selectedItem.url}
                        width="100%"
                        height="100%"
                        light={false}
                        controls
                        playing={false}
                      />
                    </div>
                  )}
                </div>
                
                {editData.title ? (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <input
                        type="text"
                        value={editData.title}
                        onChange={(e) => setEditData({...editData, title: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Description
                      </label>
                      <textarea
                        value={editData.description}
                        onChange={(e) => setEditData({...editData, description: e.target.value})}
                        rows={3}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Tags
                      </label>
                      <div className="flex flex-wrap gap-2 mb-2">
                        {editData.tags?.map(tag => (
                          <span 
                            key={tag} 
                            className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                          >
                            {tag}
                            <button
                              onClick={() => setEditData({
                                ...editData,
                                tags: editData.tags.filter(t => t !== tag)
                              })}
                              className="ml-1 text-blue-600 hover:text-blue-800"
                            >
                              <FiX size={12} />
                            </button>
                          </span>
                        ))}
                      </div>
                      <div className="flex gap-2">
                        <select
                          onChange={(e) => {
                            if (e.target.value && !editData.tags.includes(e.target.value)) {
                              setEditData({
                                ...editData,
                                tags: [...editData.tags, e.target.value]
                              });
                            }
                            e.target.value = '';
                          }}
                          className="flex-grow text-sm rounded border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                        >
                          <option value="">Add a tag</option>
                          {tags
                            .filter(tag => !editData.tags.includes(tag))
                            .map(tag => (
                              <option key={tag} value={tag}>{tag}</option>
                            ))}
                        </select>
                      </div>
                    </div>
                    
                    <div className="pt-2 flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex-1"
                      >
                        Save Changes
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="px-4 py-2 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Title
                      </label>
                      <p className="text-sm text-gray-900">{selectedItem.title}</p>
                    </div>
                    
                    {selectedItem.description && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Description
                        </label>
                        <p className="text-sm text-gray-900">{selectedItem.description}</p>
                      </div>
                    )}
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Type
                        </label>
                        <p className="text-sm text-gray-900 capitalize">{selectedItem.type}</p>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Size
                        </label>
                        <p className="text-sm text-gray-900">{formatFileSize(selectedItem.size)}</p>
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Uploaded
                      </label>
                      <p className="text-sm text-gray-900">{formatDate(selectedItem.uploadDate)}</p>
                    </div>
                    
                    {selectedItem.tags?.length > 0 && (
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {selectedItem.tags.map(tag => (
                            <span 
                              key={tag} 
                              className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-2 space-y-2">
                      <button
                        onClick={() => startEditing(selectedItem)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center space-x-2"
                      >
                        <FiEdit2 size={16} />
                        <span>Edit Details</span>
                      </button>
                      <button
                        onClick={() => deleteItem(selectedItem.id)}
                        className="w-full px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 flex items-center justify-center space-x-2"
                      >
                        <FiTrash2 size={16} />
                        <span>Delete Media</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default GalleryUpload;