import React from "react";

const cards = [
  {
    title: 'Submarine Robot',
    img: "src/assets/img/submarine.jpg",
    desc: 'uh swim.',
  },
  {
    title: 'Humanoid Robot',
    img: "src/assets/img/humanoid.jpg",
    desc: 'Human-like .',
  },
  {
    title: 'Quadkopter',
    img: "src/assets/img/quadkopter.jpg",
    desc: 'drone.',
  },
];

const Mid = () => {
  return (
    <>
      <div className="bg-white">
        <section className="text-black py-16 px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-glancyr mb-4">
            Our Vision for Innovation
          </h2>
          <p className="max-w-3xl mx-auto text-black/80 font-sfpro">
            At ROBOTIIK, we aim to shape the future of robotics through collaboration, creativity,
            and cutting-edge technology. Our multidisciplinary team works together to solve real-world
            challenges and build meaningful tech experiences.
          </p>
        </section>
        <section className="text-black py-4 px-6">
          <h2 className="text-3xl md:text-4xl font-glancyr text-center mb-12">Our Projects</h2>
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            {cards.map((card, index) => (
              <div
                key={index}
                className="group relative overflow-hidden rounded-xl shadow-lg bg-white"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-64 object-cover transform group-hover:scale-110 transition duration-500 ease-in-out"
                />
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition duration-300 ease-in-out"></div>
                <div className="absolute inset-0 flex flex-col justify-end p-4 pointer-events-none opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
                  <h3 className="text-xl font-glancyr">{card.title}</h3>
                  <p className="text-sm text-white font-sfpro">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </>
  );
};

export default Mid;