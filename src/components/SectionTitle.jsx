import PropTypes from 'prop-types'; 

const SectionTitle = ({heading, subHeading}) => {
    return (
        <div className="mx-auto text-center max-w-[400px] my-8">
            <p className="text-black mb-2 italic">--- {subHeading} ---</p>
            <h3 className="text-3xl uppercase border-y-4 py-4 font-medium font-serif">{heading}</h3>
        </div>
    );
};

export default SectionTitle;

SectionTitle.propTypes = {
    heading: PropTypes.string,
    subHeading: PropTypes.string
}
