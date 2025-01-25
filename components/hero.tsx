import ButtonWithModal from "./ui/button-with-modal";

export default function Hero(){
  return(
    <section className="bg-blue-600 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
            Be Smart In Managing Housing Society{" "}
          </h1>
          <h4 className="scroll-m-20 text-xl font-semibold tracking-tight mt-5">
            Discover amazing features and solutions tailored for you.
          </h4>
          <p className="text-lg mb-6 mt-5"></p>
          <ButtonWithModal buttonText="Get Started" buttonClassName="bg-white items-start text-blue-600 px-6 py-3 rounded font-medium hover:bg-gray-200"/>
        </div>
      </section>
  )
}