import { ShieldCheckIcon } from '@heroicons/react/24/outline'; // Example of a used icon

const missionStatement = {
    title: 'Our Mission',
    description: 'At Blue Phoenix Rugby Club, our mission is to foster a love for rugby, build strong community ties, and achieve excellence both on and off the field.',
    icon: ShieldCheckIcon, // Example usage
};

export default function MissionStatement() {
    return (
        <div className="bg-white py-10 sm:py-12 md:py-16">
            <div className="mx-auto max-w-7xl px-6 lg:px-8">
                <div className="mx-auto max-w-2xl lg:text-center">
                    <div className="flex items-center justify-center mb-6">
                        <missionStatement.icon className="h-8 w-8 text-blue-600 sm:h-10 sm:w-10" />
                    </div>
                    <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-blue-600 font-bigNoodle">
                        {missionStatement.title}
                    </h2>
                    <p className="mt-4 sm:mt-6 text-base sm:text-lg md:text-xl leading-6 sm:leading-7 font-acumin">
                        {missionStatement.description}
                    </p>
                </div>
            </div>
        </div>
    );
}
