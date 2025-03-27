const LoadingModal = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-6 rounded-md flex items-center">
                <span className="loading loading-spinner w-20 text-info"></span>
                <p className="ml-4 text-lg">Please wait...</p>
            </div>
        </div>
    );
};

export default LoadingModal;