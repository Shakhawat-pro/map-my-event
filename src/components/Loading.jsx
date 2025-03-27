const Loading = ({ isLoading }) => {
    if (!isLoading) {
        return null;
    }

    return (
        <div className=" flex items-center justify-center">
            <div className="bg-white p-6 rounded-md flex items-center">
                <span className="loading loading-spinner w-20 text-[#9733ee]"></span>
                <p className="ml-4 text-lg">Please wait...</p>
            </div>
        </div>
    );
};

export default Loading;