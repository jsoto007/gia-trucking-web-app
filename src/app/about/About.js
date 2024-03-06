import React from "react";

export default function About() {

  return(
    <div className="bg-white mx-auto -mt-12 max-w-7xl px-6 sm:mt-0 lg:px-8 xl:-mt-8">
      <div className="mx-auto max-w-2xl lg:mx-0 lg:max-w-none">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Our mission</h2>
        <div className="mt-6 flex flex-col gap-x-8 gap-y-20 lg:flex-row">
          <div className="lg:w-full lg:max-w-2xl lg:flex-auto">
            <p className="text-xl leading-8 text-gray-600">
            At GIA Blessed Trucking, we are committed to delivering outstanding logistical services to our clients with honesty, dependability, and effectiveness. Our focus is on ensuring safe, timely, and cost-effective delivery of every shipment while continuously innovating and adapting to meet our customers evolving needs.
            </p>
            <div className="mt-10 max-w-xl text-base leading-7 text-gray-700">
              <p>
              Our aim is to exceed client expectations by delivering unmatched logistical solutions. We create long-lasting relationships based on trust with personalized services and innovative solutions. Our team of skilled professionals is committed to surpassing client requirements and going above and beyond to provide the best possible experience.
              </p>
              <p className="mt-10">
              Our values of integrity, reliability, and excellence guide us as we pursue our mission. We strive for quality and customer satisfaction to set the standard in transportation and build lasting trust with our clients.
              </p>
            </div>
          </div>
          <div className="lg:flex lg:flex-auto lg:justify-center">
            <dl className="w-64 space-y-8 xl:w-80">
                <div className="flex flex-col-reverse gap-y-4">
                  <dt className="text-base leading-7 text-gray-600">label</dt>
                  <dd className="text-5xl font-semibold tracking-tight text-gray-900">Value</dd>
                </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  )
}