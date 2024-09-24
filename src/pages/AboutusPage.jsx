import React from 'react';

// Define reusable styles
const sectionTitleClasses = "text-3xl font-bold mb-4";
const sectionTextClasses = "text-lg mb-6";
const listClasses = "list-disc pl-6 text-lg space-y-2";
const highlightTextClasses = "font-semibold text-primary";
const imgContainerClasses = "w-full h-64 bg-gray-200 rounded-lg overflow-hidden";
const imgClasses = "w-full h-full object-cover";
const timelineContainerClasses = "relative pl-10";
const timelineItemClasses = "mb-8";
const timelineBulletClasses = "absolute w-4 h-4 bg-blue-500 rounded-full left-0";
const timelineContentClasses = "ml-8";

const AboutusPage = () => {
    return (
        <div className="container mx-auto p-4">
            <h1 className="text-4xl font-bold text-center mb-8 text-primary">About Us</h1>

            {/* Introduction */}
            <section className="mb-12">
                <h2 className={sectionTitleClasses}>Introduction</h2>
                <div className="flex flex-col md:flex-row md:items-center md:gap-6">
                    <div className={imgContainerClasses}>
                        <img src="https://placehold.co/600x400" alt="Introduction" className={imgClasses} />
                    </div>
                    <div className="mt-6 md:mt-0">
                        <p className={sectionTextClasses}>
                            Welcome to <span className={highlightTextClasses}>Blue Phoenix Sports Limited</span>! We are dedicated to excellence in sports management and training, committed to empowering athletes of all levels.
                        </p>
                        <p className={sectionTextClasses}>
                            Our mission is to provide high-quality sports programs and foster a supportive community where athletes can thrive and reach their full potential.
                        </p>
                    </div>
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="mb-12">
                <h2 className={sectionTitleClasses}>Our Mission</h2>
                <p className={sectionTextClasses}>
                    To deliver top-notch sports training and management services that inspire and develop athletes to excel both on and off the field.
                </p>
                <div className={imgContainerClasses + " mb-8"}>
                    <img src="https://placehold.co/600x400" alt="Mission" className={imgClasses} />
                </div>
                <h2 className={`${sectionTitleClasses} mt-8`}>Our Vision</h2>
                <p className={sectionTextClasses}>
                    To be a leading sports academy known for fostering talent, promoting teamwork, and creating opportunities for growth and success.
                </p>
                <div className={imgContainerClasses}>
                    <img src="https://placehold.co/600x400" alt="Vision" className={imgClasses} />
                </div>
            </section>

            {/* Core Values */}
            <section className="mb-12">
                <h2 className={sectionTitleClasses}>Core Values</h2>
                <ul className={listClasses}>
                    <li><span className={highlightTextClasses}>Excellence:</span> Striving for the highest standards in everything we do.</li>
                    <li><span className={highlightTextClasses}>Integrity:</span> Building trust through honesty and ethical practices.</li>
                    <li><span className={highlightTextClasses}>Community:</span> Creating a supportive environment that encourages growth and collaboration.</li>
                    <li><span className={highlightTextClasses}>Passion:</span> Fueling our work with enthusiasm and commitment to sports and athletes.</li>
                </ul>
                <div className={imgContainerClasses + " mt-8"}>
                    <img src="https://placehold.co/600x400" alt="Core Values" className={imgClasses} />
                </div>
            </section>

            {/* History with Timeline */}
            <section className="mb-12">
                <h2 className={sectionTitleClasses}>Our History</h2>
                <div className={timelineContainerClasses}>
                    <div className={timelineItemClasses}>
                        <div className={timelineBulletClasses}></div>
                        <div className={timelineContentClasses}>
                            <h3 className="text-xl font-semibold mb-2">Founding Year</h3>
                            <p className={sectionTextClasses}>
                                Blue Phoenix Sports Limited was founded with a vision to revolutionize sports management and training.
                            </p>
                            <div className={imgContainerClasses + " mt-4"}>
                                <img src="https://placehold.co/600x400" alt="Founding Year" className={imgClasses} />
                            </div>
                        </div>
                    </div>
                    <div className={timelineItemClasses}>
                        <div className={timelineBulletClasses}></div>
                        <div className={timelineContentClasses}>
                            <h3 className="text-xl font-semibold mb-2">First Major Milestone</h3>
                            <p className={sectionTextClasses}>
                                Reached our first major milestone with the launch of our flagship sports training program.
                            </p>
                            <div className={imgContainerClasses + " mt-4"}>
                                <img src="https://placehold.co/600x400" alt="First Major Milestone" className={imgClasses} />
                            </div>
                        </div>
                    </div>
                    <div className={timelineItemClasses}>
                        <div className={timelineBulletClasses}></div>
                        <div className={timelineContentClasses}>
                            <h3 className="text-xl font-semibold mb-2">Expansion and Growth</h3>
                            <p className={sectionTextClasses}>
                                Expanded our services to include new sports disciplines and opened additional training centers.
                            </p>
                            <div className={imgContainerClasses + " mt-4"}>
                                <img src="https://placehold.co/600x400" alt="Expansion and Growth" className={imgClasses} />
                            </div>
                        </div>
                    </div>
                    <div className={timelineItemClasses}>
                        <div className={timelineBulletClasses}></div>
                        <div className={timelineContentClasses}>
                            <h3 className="text-xl font-semibold mb-2">Recent Achievements</h3>
                            <p className={sectionTextClasses}>
                                Achieved significant milestones in athlete development and community engagement.
                            </p>
                            <div className={imgContainerClasses + " mt-4"}>
                                <img src="https://placehold.co/600x400" alt="Recent Achievements" className={imgClasses} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Call to Action */}
            <section className="text-center mb-8">
                <h2 className="text-2xl font-bold mb-4">Join Us</h2>
                <p className="text-lg mb-4">
                    Interested in being part of our community? Whether you're looking to join our programs or support our mission, we would love to hear from you!
                </p>
                <a href="/contact" className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors">Contact Us</a>
            </section>
        </div>
    );
};

export default AboutusPage;
