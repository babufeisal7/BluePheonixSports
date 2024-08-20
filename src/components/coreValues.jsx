import { GlobeAltIcon, UserGroupIcon, AcademicCapIcon, HandThumbUpIcon } from '@heroicons/react/24/outline';

const values = [
    {
        name: 'Global Impact',
        description: 'Expanding our reach to create a positive impact worldwide.',
        icon: GlobeAltIcon,
    },
    {
        name: 'Community Engagement',
        description: 'Fostering strong relationships within our local community.',
        icon: UserGroupIcon,
    },
    {
        name: 'Continuous Learning',
        description: 'Encouraging growth and development through ongoing education.',
        icon: AcademicCapIcon,
    },
    {
        name: 'Excellence and Integrity',
        description: 'Commitment to high standards and ethical practices.',
        icon: HandThumbUpIcon,
    },
];

const CoreValues = () => {
    return (
        <div className="py-8 sm:py-12">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="text-center">
                    <h2 className="text-2xl font-semibold leading-7 text-indigo-600 sm:text-3xl md:text-4xl">Our Core Values</h2>
                </div>
                <div className="mt-12 max-w-lg sm:mx-auto md:max-w-none">
                    <div className="grid gap-8 sm:gap-12 md:grid-cols-2 lg:gap-x-12 lg:gap-y-12">
                        {values.map((value) => (
                            <div
                                key={value.name}
                                className="relative flex flex-col items-start gap-6 p-6 bg-white shadow-lg rounded-lg hover:shadow-xl transition-shadow duration-300"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-500 text-white">
                                    <value.icon className="h-8 w-8" aria-hidden="true" />
                                </div>
                                <div className="space-y-4">
                                    <p className="text-xl font-semibold leading-6 text-gray-900">{value.name}</p>
                                    <p className="text-base leading-6 text-gray-600">{value.description}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoreValues;
