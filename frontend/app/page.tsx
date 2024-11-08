"use client"
import React from 'react';
import Footer from '../app/components/footer';
import MenuBar from '../app/components/menubar';
import Kuulutused from '../app/components/kuulutused';
const Page: React.FC = () => {
  return (
      <>
          <div className="flex flex-col min-h-screen pl-8">

              <main className="flex-grow">
                  <h1 className="text-1xl mb-4 mt-4 font-extralight font-thin opacity-65">SÕIDUKIKUULUTUSED</h1>
                  <MenuBar></MenuBar>
                  <section className="mb-8">
                      <h2 className="text-2xl font-semibold mb-2">Popular Car Marks</h2>
                      <ul className="list-disc list-inside">
                          <li>Toyota</li>
                          <li>Ford</li>
                          <li>BMW</li>
                          <li>Mercedes</li>
                      </ul>
                  </section>

                  <section className="mb-8">
                      <h2 className="text-2xl font-semibold mb-2">Search for Cars</h2>
                      <input type="text" placeholder="Search for cars..." className="border p-2 w-full"/>
                  </section>
<Kuulutused></Kuulutused>
              </main>
              <Footer/>
          </div>
      </>
  );
};

export default Page;