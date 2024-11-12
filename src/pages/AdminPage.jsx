import React, { useEffect, useState } from 'react';
import 'admin-lte/dist/css/adminlte.min.css';
import 'admin-lte/dist/js/adminlte.min.js';
import { Link } from 'react-router-dom';

const AdminPage = () => {
  const [currentView, setCurrentView] = useState('Dashboard');

  useEffect(() => {
    if (window.$) {
      window.$(document).ready(function () {
        // AdminLTE initialization
      });
    }
  }, []);

  const handleViewChange = (view) => {
    setCurrentView(view);
  };

// Blog Form Component
const BlogForm = ({ blog, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    {Object.entries(blog).map(([key, value]) => (
      <div className="form-group" key={key}>
        <label htmlFor={key}>{key.replace(/([A-Z])/g, ' $1')}</label>
        <input
          type="text"
          className="form-control"
          id={key}
          placeholder={`Enter ${key.replace(/([A-Z])/g, ' $1').toLowerCase()}`}
          value={value}
          onChange={(e) => onChange(key, e.target.value)}
        />
      </div>
    ))}

    {/* Additional form fields */}
    <div className="form-group">
      <label htmlFor="blogTitle">Blog Title</label>
      <input
        type="text"
        className="form-control"
        id="blogTitle"
        placeholder="Enter blog title"
        value={blog.blogTitle || ''}
        onChange={(e) => onChange('blogTitle', e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="blogDate">Date</label>
      <input
        type="date"
        className="form-control"
        id="blogDate"
        value={blog.blogDate || ''}
        onChange={(e) => onChange('blogDate', e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="blogCategory">Category</label>
      <input
        type="text"
        className="form-control"
        id="blogCategory"
        placeholder="Enter blog category"
        value={blog.blogCategory || ''}
        onChange={(e) => onChange('blogCategory', e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="blogContent">Blog Content</label>
      <textarea
        className="form-control"
        id="blogContent"
        rows="4"
        placeholder="Enter blog content"
        value={blog.blogContent || ''}
        onChange={(e) => onChange('blogContent', e.target.value)}
      ></textarea>
    </div>
    <div className="form-group">
      <label htmlFor="blogImage">Blog Image</label>
      <input
        type="file"
        className="form-control"
        id="blogImage"
        onChange={(e) => onChange('blogImage', e.target.files[0])}
      />
    </div>
    <div className="form-group">
      <label htmlFor="blogAuthor">Author</label>
      <input
        type="text"
        className="form-control"
        id="blogAuthor"
        placeholder="Enter author's name"
        value={blog.blogAuthor || ''}
        onChange={(e) => onChange('blogAuthor', e.target.value)}
      />
    </div>
    <div className="form-group">
      <label htmlFor="memberImage">Author Image</label>
      <input
        type="file"
        className="form-control"
        id="memberImage"
        accept="image/*"
        onChange={(e) => onChange('memberImage', e.target.files[0])}
      />
    </div>
    
    <button type="submit" className="btn btn-primary">Add Blog Post</button>
  </form>
);


const BlogManager = () => {
  const [blogs, setBlogs] = useState([]);
  const [newBlog, setNewBlog] = useState({ title: '', content: '', author: '' });
  const [editIndex, setEditIndex] = useState(null);
  const [error, setError] = useState('');

  const handleInputChange = (key, value) => {
    setNewBlog({ ...newBlog, [key]: value });
  };

  const handleAddOrUpdateBlog = (e) => {
    e.preventDefault();
    const { title, content, author } = newBlog;

    // Basic validation
    if (!title || !content || !author) {
      setError('All fields are required!');
      return;
    }

    setError('');

    if (editIndex !== null) {
      setBlogs(blogs.map((blog, idx) => (idx === editIndex ? newBlog : blog)));
      setEditIndex(null);
    } else {
      setBlogs([...blogs, newBlog]);
    }

    setNewBlog({ title: '', content: '', author: '' });
  };

  const handleEdit = (index) => {
    setNewBlog(blogs[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setBlogs(blogs.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>Manage Blogs</h2>
      {error && <div className="alert alert-danger">{error}</div>} {/* Error message display */}
      <BlogForm blog={newBlog} onChange={handleInputChange} onSubmit={handleAddOrUpdateBlog} />
      <ul>
        {blogs.map((blog, index) => (
          <li key={index}>
            <strong>{blog.title}</strong><br />
            Content: {blog.content}<br />
            Author: {blog.author}<br />
            <button className="btn btn-primary btn-sm" onClick={() => handleEdit(index)}>
              Edit
            </button>
            <button className="btn btn-danger btn-sm ml-2" onClick={() => handleDelete(index)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};




const TestimonialForm = ({ testimonial, onChange, onSubmit }) => {
  const [imagePreview, setImagePreview] = useState(null);

  // Function to handle file input change and preview the image
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
        onChange('avatarUrl', reader.result); // Set the base64 URL to the avatarUrl state
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <div className="form-group">
        <label htmlFor="testimonialName">Author</label>
        <input
          type="text"
          className="form-control"
          id="testimonialName"
          placeholder="Enter name"
          value={testimonial.author}
          onChange={(e) => onChange('author', e.target.value)}
        />
      </div>
      
      {/* Author Image Upload */}
      <div className="form-group">
        <label htmlFor="avatarUrl">Author Image</label>
        <input
          type="file"
          className="form-control"
          id="avatarUrl"
          onChange={handleImageChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img
              src={imagePreview}
              alt="Author"
              className="rounded-circle"
              style={{ width: '100px', height: '100px', objectFit: 'cover' }}
            />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="testimonialContent">Testimonial</label>
        <textarea
          className="form-control"
          id="testimonialContent"
          rows="4"
          placeholder="Enter testimonial"
          value={testimonial.quote}
          onChange={(e) => onChange('quote', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="socialLinks">Social Media Links</label>
        <div>
          <input
            type="text"
            className="form-control mb-2"
            id="twitterLink"
            placeholder="Enter Twitter link"
            value={testimonial.twitterLink}
            onChange={(e) => onChange('twitterLink', e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            id="linkedinLink"
            placeholder="Enter LinkedIn link"
            value={testimonial.linkedinLink}
            onChange={(e) => onChange('linkedinLink', e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            id="facebookLink"
            placeholder="Enter Facebook link"
            value={testimonial.facebookLink}
            onChange={(e) => onChange('facebookLink', e.target.value)}
          />
          <input
            type="text"
            className="form-control mb-2"
            id="instagramLink"
            placeholder="Enter Instagram link"
            value={testimonial.instagramLink}
            onChange={(e) => onChange('instagramLink', e.target.value)}
          />
        </div>
      </div>

      <button type="submit" className="btn btn-primary">Add Testimonial</button>
    </form>
  );
};


const TestimonialsManager = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [newTestimonial, setNewTestimonial] = useState({ name: '', quote: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => setNewTestimonial({ ...newTestimonial, [key]: value });

  const handleAddOrUpdateTestimonial = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setTestimonials(testimonials.map((item, idx) => idx === editIndex ? newTestimonial : item));
      setEditIndex(null);
    } else {
      setTestimonials([...testimonials, newTestimonial]);
    }
    setNewTestimonial({ name: '', quote: '' });
  };

  const handleEdit = (index) => {
    setNewTestimonial(testimonials[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setTestimonials(testimonials.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>Manage Testimonials</h2>
      <TestimonialForm testimonial={newTestimonial} onChange={handleInputChange} onSubmit={handleAddOrUpdateTestimonial} />
      <ul>
        {testimonials.map((item, index) => (
          <li key={index}>
            <strong>{item.name}</strong><br />
            "{item.quote}"<br />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const PlayerForm = ({ player, onChange, onSubmit, isEditing }) => {
  const [imagePreview, setImagePreview] = useState(player.imgSrc || '');

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Generate a URL for the file
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      onChange('imgSrc', file); // Update the state with the file object
    }
  };

  useEffect(() => {
    // Ensure that the image preview is updated when the player imgSrc changes
    if (player.imgSrc) {
      setImagePreview(URL.createObjectURL(player.imgSrc));
    }
  }, [player.imgSrc]);

  return (
    <form onSubmit={onSubmit}>
      {/* Player ID - Hidden from the user */}
      <input
        type="hidden"
        value={player.id}
        onChange={(e) => onChange('id', e.target.value)}
      />

      <div className="form-group">
        <label htmlFor="playerName">Player Name</label>
        <input
          type="text"
          className="form-control"
          id="playerName"
          placeholder="Enter player name"
          value={player.name}
          onChange={(e) => onChange('name', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerImgSrc">Player Image</label>
        <input
          type="file"
          className="form-control"
          id="playerImgSrc"
          onChange={handleFileChange}
        />
        {imagePreview && (
          <div className="mt-2">
            <img src={imagePreview} alt="Player" style={{ width: 100, height: 100 }} />
          </div>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="playerAltText">Image Alt Text</label>
        <input
          type="text"
          className="form-control"
          id="playerAltText"
          placeholder="Enter image alt text"
          value={player.altText}
          onChange={(e) => onChange('altText', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerPosition">Position</label>
        <input
          type="text"
          className="form-control"
          id="playerPosition"
          placeholder="Enter position"
          value={player.position}
          onChange={(e) => onChange('position', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerStats">Stats</label>
        <textarea
          className="form-control"
          id="playerStats"
          placeholder="Enter player stats"
          value={player.stats}
          onChange={(e) => onChange('stats', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerBio">Bio</label>
        <textarea
          className="form-control"
          id="playerBio"
          placeholder="Enter player bio"
          value={player.bio}
          onChange={(e) => onChange('bio', e.target.value)}
        />
      </div>

      <div className="form-group">
        <label htmlFor="playerExperience">Experience</label>
        <textarea
          className="form-control"
          id="playerExperience"
          placeholder="Enter player experience"
          value={player.experience}
          onChange={(e) => onChange('experience', e.target.value)}
        />
      </div>

      <button type="submit" className="btn btn-primary">{isEditing ? 'Update Player' : 'Add Player'}</button>
    </form>
  );
};

const SportManager = ({ sportName }) => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    id: '',
    name: '',
    imgSrc: '',
    altText: '',
    position: '',
    stats: '',
    bio: '',
    experience: ''
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => setNewPlayer({ ...newPlayer, [key]: value });

  const handleAddOrUpdatePlayer = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setPlayers(players.map((player, idx) => idx === editIndex ? newPlayer : player));
      setEditIndex(null);
    } else {
      setPlayers([...players, newPlayer]);
    }
    setNewPlayer({
      id: '',
      name: '',
      imgSrc: '',
      altText: '',
      position: '',
      stats: '',
      bio: '',
      experience: ''
    });
  };

  const handleEdit = (index) => {
    setNewPlayer(players[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setPlayers(players.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>{sportName} Players</h2>
      <PlayerForm player={newPlayer} onChange={handleInputChange} onSubmit={handleAddOrUpdatePlayer} />
      <ul>
        {players.map((player, index) => (
          <li key={index}>
            <strong>{player.name}</strong><br />
            <img src={player.imgSrc} alt={player.altText} style={{ width: 100, height: 100 }} /><br />
            Position: {player.position}<br />
            Stats: {player.stats}<br />
            Bio: {player.bio}<br />
            Experience: {player.experience}<br />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};




// Sponsor Form Component
const SponsorForm = ({ sponsor, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="form-group mb-4">
      <label htmlFor="sponsorName" className="block text-sm font-medium text-gray-700">Sponsor Name</label>
      <input
        type="text"
        className="form-control mt-2 w-full p-2 border border-gray-300 rounded-md"
        id="sponsorName"
        placeholder="Enter sponsor name"
        value={sponsor.sponsorName}
        onChange={(e) => onChange('sponsorName', e.target.value)}
      />
    </div>

    <div className="form-group mb-4">
      <label htmlFor="sponsorLogo" className="block text-sm font-medium text-gray-700">Sponsor Logo</label>
      <input
        type="file"
        className="form-control mt-2 w-full p-2 border border-gray-300 rounded-md"
        id="sponsorLogo"
        onChange={(e) => onChange('sponsorLogo', e.target.files[0])}
      />
    </div>

    <button type="submit" className="btn btn-primary">Save sponsor</button>
  </form>
);

const SponsorsManager = () => {
  const [sponsors, setSponsors] = useState([]);
  const [newSponsor, setNewSponsor] = useState({ sponsorName: '', sponsorLogo: null });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => {
    // For file input, we're passing the file directly.
    setNewSponsor({ ...newSponsor, [key]: value });
  };

  const handleAddOrUpdateSponsor = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setSponsors(sponsors.map((sponsor, idx) => idx === editIndex ? newSponsor : sponsor));
      setEditIndex(null);
    } else {
      setSponsors([...sponsors, newSponsor]);
    }
    setNewSponsor({ sponsorName: '', sponsorLogo: null });
  };

  const handleEdit = (index) => {
    setNewSponsor(sponsors[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setSponsors(sponsors.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>Manage Sponsors</h2>
      <SponsorForm sponsor={newSponsor} onChange={handleInputChange} onSubmit={handleAddOrUpdateSponsor} />
      <ul>
        {sponsors.map((sponsor, index) => (
          <li key={index} className="mb-4">
            <strong>{sponsor.sponsorName}</strong><br />
            {sponsor.sponsorLogo && (
              <img src={URL.createObjectURL(sponsor.sponsorLogo)} alt="Sponsor Logo" className="w-20 h-20 object-contain my-2" />
            )}
            <button
              className="btn btn-primary btn-sm bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
              onClick={() => handleEdit(index)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm bg-red-500 text-white px-4 py-2 rounded-md"
              onClick={() => handleDelete(index)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const GalleryUploadForm = ({ sportName, onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedImage) {
      onImageUpload(sportName, selectedImage);
      setSelectedImage(null);
    }
  };

  return (
    <div>
      <h3>Upload Image for {sportName}</h3>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="imageUpload">Choose Image</label>
          <input
            type="file"
            className="form-control"
            id="imageUpload"
            onChange={handleImageChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Upload Image</button>
      </form>
    </div>
  );
};


const Gallery = () => {
  const [galleries, setGalleries] = useState({
    Rugby: [],
    Football: [],
    Basketball: [],
    Swimming: [],
  });

  const handleImageUpload = (sportName, image) => {
    // Create a new FormData object to handle image upload if needed (e.g., to an API)
    const newImage = URL.createObjectURL(image);
    setGalleries({
      ...galleries,
      [sportName]: [...galleries[sportName], newImage],
    });
  };

  return (
    <div>
      <h2>Sports Gallery</h2>

      {/* Gallery Upload Form for each sport */}
      <GalleryUploadForm sportName="Rugby" onImageUpload={handleImageUpload} />
      <GalleryUploadForm sportName="Football" onImageUpload={handleImageUpload} />
      <GalleryUploadForm sportName="Basketball" onImageUpload={handleImageUpload} />
      <GalleryUploadForm sportName="Swimming" onImageUpload={handleImageUpload} />

      {/* Display Gallery for Each Sport */}
      <div className="gallery-section">
        {Object.keys(galleries).map((sportName) => (
          <div key={sportName}>
            <h3>{sportName} Gallery</h3>
            <div className="gallery-images">
              {galleries[sportName].map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Uploaded for ${sportName}`}
                  className="gallery-image"
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Member Form Component
const MemberForm = ({ member, onChange, onSubmit }) => (
  <form onSubmit={onSubmit}>
    <div className="form-group">
      <label htmlFor="memberName">Member Name</label>
      <input
        type="text"
        className="form-control"
        id="memberName"
        placeholder="Enter member name"
        value={member.memberName}
        onChange={(e) => onChange('memberName', e.target.value)}
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="memberEmail">Member Email</label>
      <input
        type="email"
        className="form-control"
        id="memberEmail"
        placeholder="Enter email address"
        value={member.memberEmail}
        onChange={(e) => onChange('memberEmail', e.target.value)}
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="memberRole">Member Role</label>
      <input
        type="text"
        className="form-control"
        id="memberRole"
        placeholder="Enter role"
        value={member.memberRole}
        onChange={(e) => onChange('memberRole', e.target.value)}
      />
    </div>
    
    <div className="form-group">
      <label htmlFor="memberImage">Member Image</label>
      <input
        type="file"
        className="form-control"
        id="memberImage"
        accept="image/*"
        onChange={(e) => onChange('memberImage', e.target.files[0])}
      />
    </div>

    <button type="submit" className="btn btn-primary">Save Member</button>
  </form>
);

const MembersManager = () => {
  const [members, setMembers] = useState([]);
  const [newMember, setNewMember] = useState({ memberName: '' });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => setNewMember({ ...newMember, [key]: value });

  const handleAddOrUpdateMember = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setMembers(members.map((member, idx) => idx === editIndex ? newMember : member));
      setEditIndex(null);
    } else {
      setMembers([...members, newMember]);
    }
    setNewMember({ memberName: '' });
  };

  const handleEdit = (index) => {
    setNewMember(members[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setMembers(members.filter((_, idx) => idx !== index));
  };

  return (
    <div>
      <h2>Manage Members</h2>
      {/* Render the Member Form with props for member data and handlers */}
      <MemberForm 
        member={newMember} 
        onChange={handleInputChange} 
        onSubmit={handleAddOrUpdateMember} 
      />
      
      {/* List of members with edit and delete options */}
      <ul>
        {members.map((member, index) => (
          <li key={index}>
            <strong>{member.memberName}</strong><br />
            <button onClick={() => handleEdit(index)}>Edit</button>
            <button onClick={() => handleDelete(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

const EventForm = ({ event, onChange, onSubmit }) => (
  <form onSubmit={onSubmit} className="space-y-4 p-6 bg-white shadow-lg rounded-lg">
    <div className="form-group">
      <label htmlFor="name" className="block text-sm font-medium text-gray-700">Event Name</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="name"
        placeholder="Enter event name"
        value={event.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="date" className="block text-sm font-medium text-gray-700">Event Date</label>
      <input
        type="date"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="date"
        value={event.date}
        onChange={(e) => onChange('date', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="registration" className="block text-sm font-medium text-gray-700">Registration</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="registration"
        placeholder="Enter registration details"
        value={event.registration}
        onChange={(e) => onChange('registration', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="organizer" className="block text-sm font-medium text-gray-700">Organizer</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="organizer"
        placeholder="Enter organizer name"
        value={event.organizer}
        onChange={(e) => onChange('organizer', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="organizerPhone" className="block text-sm font-medium text-gray-700">Organizer Phone</label>
      <input
        type="tel"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="organizerPhone"
        placeholder="Enter organizer phone number"
        value={event.organizerPhone}
        onChange={(e) => onChange('organizerPhone', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="awards" className="block text-sm font-medium text-gray-700">Awards</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="awards"
        placeholder="Enter awards details"
        value={event.awards}
        onChange={(e) => onChange('awards', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="catering" className="block text-sm font-medium text-gray-700">Catering</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="catering"
        placeholder="Enter catering details"
        value={event.catering}
        onChange={(e) => onChange('catering', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="venue" className="block text-sm font-medium text-gray-700">Venue</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="venue"
        placeholder="Enter venue name"
        value={event.venue}
        onChange={(e) => onChange('venue', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="venueLocation" className="block text-sm font-medium text-gray-700">Venue Location</label>
      <input
        type="text"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="venueLocation"
        placeholder="Enter venue location"
        value={event.venueLocation}
        onChange={(e) => onChange('venueLocation', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="venuePhone" className="block text-sm font-medium text-gray-700">Venue Phone</label>
      <input
        type="tel"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="venuePhone"
        placeholder="Enter venue phone number"
        value={event.venuePhone}
        onChange={(e) => onChange('venuePhone', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="venuePhoneTwo" className="block text-sm font-medium text-gray-700">Venue Phone (Optional)</label>
      <input
        type="tel"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="venuePhoneTwo"
        placeholder="Enter second venue phone number (optional)"
        value={event.venuePhoneTwo}
        onChange={(e) => onChange('venuePhoneTwo', e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="image" className="block text-sm font-medium text-gray-700">Event Image</label>
      <input
        type="file"
        className="form-control w-full p-2 border border-gray-300 rounded-md"
        id="image"
        accept="image/*"
        onChange={(e) => onChange('image', e.target.files[0])}
      />
    </div>

    <button type="submit" className="btn btn-primary mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
      Save Event
    </button>
  </form>
);

const EventsManager = () => {
  const [events, setEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    name: '',
    date: '',
    registration: '',
    organizer: '',
    organizerPhone: '',
    awards: '',
    catering: '',
    venue: '',
    venueLocation: '',
    venuePhone: '',
    venuePhoneTwo: '',
    image: null,
  });
  const [editIndex, setEditIndex] = useState(null);

  const handleInputChange = (key, value) => setNewEvent({ ...newEvent, [key]: value });

  const handleAddOrUpdateEvent = (e) => {
    e.preventDefault();
    if (editIndex !== null) {
      setEvents(events.map((event, idx) => (idx === editIndex ? newEvent : event)));
      setEditIndex(null);
    } else {
      setEvents([...events, newEvent]);
    }
    setNewEvent({
      name: '',
      date: '',
      registration: '',
      organizer: '',
      organizerPhone: '',
      awards: '',
      catering: '',
      venue: '',
      venueLocation: '',
      venuePhone: '',
      venuePhoneTwo: '',
      image: null,
    });
  };

  const handleEdit = (index) => {
    setNewEvent(events[index]);
    setEditIndex(index);
  };

  const handleDelete = (index) => {
    setEvents(events.filter((_, idx) => idx !== index));
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Manage Events</h2>
      <EventForm event={newEvent} onChange={handleInputChange} onSubmit={handleAddOrUpdateEvent} />
      <ul className="mt-4">
        {events.map((event, index) => (
          <li key={index} className="border-b pb-4 mb-4">
            <div>
              <strong className="text-lg">{event.name}</strong><br />
              <span className="text-sm text-gray-600">Date: {event.date}</span><br />
              <span className="text-sm text-gray-600">Location: {event.location}</span><br />
              {event.registration && <span className="text-sm text-gray-600">Registration: {event.registration}</span>}<br />
              {event.organizer && <span className="text-sm text-gray-600">Organizer: {event.organizer}</span>}<br />
              {event.awards && <span className="text-sm text-gray-600">Awards: {event.awards}</span>}<br />
              <div className="mt-2">
                <button
                  className="btn btn-primary btn-sm bg-blue-500 text-white rounded px-4 py-2"
                  onClick={() => handleEdit(index)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm ml-2 bg-red-500 text-white rounded px-4 py-2"
                  onClick={() => handleDelete(index)}
                >
                  Delete
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

const renderContent = () => {
  switch (currentView) {
    case 'Blog':
      return <BlogManager />;
    case 'Testimonials':
      return <TestimonialsManager />;
          case 'Rugby':
      return <SportManager sportName="Rugby" />;
    case 'Football':
      return <SportManager sportName="Football" />;
    case 'Basketball':
      return <SportManager sportName="Basketball" />;
    case 'Swimming':
      return <SportManager sportName="Swimming" />;
    case 'Sponsors':
      return <SponsorsManager />;
    case 'Gallery':
      return <Gallery />;   
    case 'Members':
      return <MembersManager />;
    case 'Events':
      return <EventsManager />;
   
    default:
      return <div>Welcome to the Admin Dashboard!</div>;
  }
};

  return (
    <div className="wrapper">
      <aside className="main-sidebar sidebar-dark-primary elevation-4">
        <Link to="/" className="brand-link">
          <span className="brand-text font-weight-light">Admin Dashboard</span>
        </Link>
        <div className="sidebar">
          <nav className="mt-2">
          <ul className="nav nav-pills nav-sidebar flex-column" role="menu">
  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Dashboard')}>
      Dashboard
    </button>
  </li>
  
 
  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Blog')}>
      Blog
    </button>
  </li>
  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Testimonials')}>
      Testimonials
    </button>
  </li>
 
  <li className="nav-item">
  <button className="nav-link" onClick={() => handleViewChange('Rugby')}>
    Rugby
  </button>
</li>
<li className="nav-item">
  <button className="nav-link" onClick={() => handleViewChange('Football')}>
    Football
  </button>
</li>
<li className="nav-item">
  <button className="nav-link" onClick={() => handleViewChange('Basketball')}>
    Basketball
  </button>
</li>
<li className="nav-item">
  <button className="nav-link" onClick={() => handleViewChange('Swimming')}>
    Swimming
  </button>
</li>

  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Sponsors')}>
      Sponsors
    </button>
  </li>

        <li className="nav-item">
        <button className="nav-link" onClick={() => handleViewChange('Gallery')}>
          Gallery
        </button>
      </li>
  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Members')}>
      Members
    </button>
  </li>
  <li className="nav-item">
    <button className="nav-link" onClick={() => handleViewChange('Events')}>
      Events
    </button>
  </li>
</ul>
          </nav>
        </div>
      </aside>

      <div className="content-wrapper">
        <section className="content">
          <div className="container-fluid">
            {renderContent()}
          </div>
        </section>
      </div>
    </div>
  );
};

export default AdminPage;
