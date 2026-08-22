function FeatureCard({ icon: Icon, title, description }) {
    return (
        <div className="feature-card rounded-2xl border border-violet-100 bg-white p-7 shadow-sm">

            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-violet-50">
                <Icon
                    size={27}
                    strokeWidth={1.8}
                    className="text-violet-600"
                />
            </div>

            <h3 className="text-lg font-bold text-gray-900">
                {title}
            </h3>

            <p className="mt-3 leading-7 text-gray-500">
                {description}
            </p>
        </div>
    );
}

export default FeatureCard;