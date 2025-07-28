import React from 'react'


const features = [
    {
        title: "UK’s Expert Price Comparison",
        icon: "🔖",
        description: `idealo is one of Europe’s leading price comparison sites. We attract over ten million monthly users from across the UK and five European countries. Why? Maybe it’s because we currently have over 210 million offers from 30,000 shops to compare from. Our prices are updated regularly and feature comprehensive, thoroughly-researched product information. Using all of this, we equip consumers with the knowledge they need to find the cheapest prices.`,
    },
    {
        title: "Easy to Use",
        icon: "🎖️",
        description: `It couldn’t be simpler. Looking for the cheapest price? You’ll find it at the top of the list of shops. Want to see if that’s the lowest the price has been for the product? Just check out the Price History. Want us to email you when the product hits the price you want? Simply set up a Price Alert. From smartphones to smart homes, we’ve got you covered.`,
    },
    {
        title: "Expert Reviews & User Opinions",
        icon: "💬",
        description: `Don’t worry - it’s not all about price comparison. On idealo you’ll also find honest product reviews from our users to help you make the best decision, as well as expert reviews. Not only can British consumers find the best price, but also expert information on products they are looking for. At the heart of the company is our 250-strong Content Team curating products, ensuring that our prices are up-to-date and you can find everything you need. All of this is to ensure you get the best deal every time.`,
    },
    {
        title: "Only the best price counts",
        icon: "🏆",
        description: `The key to idealo’s price comparison is that we’re 100% impartial. Every partner shop, whether global player or niche retailer, has an equal chance of reaching the top position - simply by providing the best price. Most importantly, we offer this service completely free of charge - idealo is funded solely through our shops and online advertising.`,
    },
];


const AboutUs = () => {
    return (
        <section className="bg-white py-9 px-6 md:px-20 text-[#767676]">
            <div className='container'>
                <h2 className="text-center text-3xl md:text-4xl font-semibold mb-14 text-[767676]">
                    name - Your Price Comparison
                </h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 text-left">
                    {features.map((feature, idx) => (
                        <div key={idx} className="flex flex-col items-center space-y-4">
                            <div className="text-5xl">{feature.icon}</div>
                            <h3 className="text-lg font-semibold ">{feature.title}</h3>
                            <p className="text-sm leading-relaxed ">{feature.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default AboutUs