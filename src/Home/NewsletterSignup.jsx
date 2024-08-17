const NewsletterSignup = () => {
  return (
    <div className="bg-gray-100 py-10 px-6 md:px-12 lg:px-24 text-center rounded-lg my-10">
      <h3 className="text-3xl font-bold mb-4">Subscribe to Our Newsletter</h3>
      <p className="text-lg mb-6">
        Stay updated with the latest offers, news, and discounts by subscribing
        to our newsletter.
      </p>
      <form className="flex flex-col md:flex-row justify-center">
        <input
          type="email"
          placeholder="Enter your email"
          className="w-full md:w-2/3 p-3 rounded-lg border border-gray-300 mb-4 md:mb-0 md:mr-4"
          required
        />
        <button
          type="submit"
          className="w-full md:w-1/3 p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterSignup;
