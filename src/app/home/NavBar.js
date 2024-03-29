import { Fragment } from 'react'
import { Disclosure, Menu, Transition } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import { PlusIcon } from '@heroicons/react/20/solid'
import GiaLogoFinal from "../../../public/GiaLogoFinal.png"
import Image from 'next/image'
import { Link } from "react-scroll/modules"

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function NavBar() {

  const navigation = [
    { name: 'Home', to: "home" },
    { name: 'About', to: "about" },
    { name: 'Contact', to: "contact" },
  ]

  return (
    <Disclosure as="nav" className="bg-white/95 shadow sticky top-0 z-50">
      {({ open }) => (
        <>
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="flex h-16 justify-between">
              <div className="flex">
                <div className="-ml-2 mr-2 flex items-center md:hidden">
                  <Disclosure.Button className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500">
                    <span className="absolute -inset-0.5" />
                    <span className="sr-only">Open main menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      <Bars3Icon className="block h-6 w-6" aria-hidden="true" />
                    )}
                  </Disclosure.Button>
                </div>
                <div className="flex flex-shrink-0 items-center">
                  <Image
                    className="h-8 w-auto"
                    src={GiaLogoFinal}
                    alt="GIA BLESSED TRUCKING"
                  />
                </div>
                <div className="hidden md:ml-6 md:flex md:space-x-8">
                
                    {navigation.map((item) => (
                      <button 
                        key={item.name} 
                        className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                      >
                        <Link to={item.to} smooth={true} duration={500} offset={40}>
                          <ul>
                            {item.name}
                          </ul>
                        </Link>
                      </button>
                    ))}
            
                </div>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  <button
                    type="button"
                    className="relative inline-flex items-center gap-x-1.5 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <PlusIcon className="-ml-0.5 h-5 w-5" aria-hidden="true" />
                    New Job
                  </button>
                </div>
                <div className="hidden md:ml-4 md:flex md:flex-shrink-0 md:items-center">
               
                  <Menu as="div" className="relative ml-3">
                   
                    <Transition
                      as={Fragment}
                      enter="transition ease-out duration-200"
                      enterFrom="transform opacity-0 scale-95"
                      enterTo="transform opacity-100 scale-100"
                      leave="transition ease-in duration-75"
                      leaveFrom="transform opacity-100 scale-100"
                      leaveTo="transform opacity-0 scale-95"
                    >
                    </Transition>
                  </Menu>
                </div>
              </div>
            </div>
          </div>

          <Disclosure.Panel className="md:hidden">
            <div className="space-y-1 pb-3 pt-2">

              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-indigo-500 bg-indigo-50 py-2 pl-3 pr-4 text-base font-medium text-indigo-700 sm:pl-5 sm:pr-6"
              >
                Home
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                About
              </Disclosure.Button>
              <Disclosure.Button
                as="a"
                href="#"
                className="block border-l-4 border-transparent py-2 pl-3 pr-4 text-base font-medium text-gray-500 hover:border-gray-300 hover:bg-gray-50 hover:text-gray-700 sm:pl-5 sm:pr-6"
              >
                Contact
              </Disclosure.Button>

            </div>
            <div className="border-t border-gray-200 pb-3 pt-4">
              <div className="flex items-center px-4 sm:px-6">
                <div className="flex-shrink-0">
                  <Image
                    className="h-10 w-10 rounded-full"
                    src={GiaLogoFinal}
                    alt="Truck"
                  />
                </div>  
                <div className="ml-3">
                  <div className="text-base font-medium text-gray-800">Gia Blessed Trucking</div>
                  <div className="text-sm font-medium text-gray-500 " href="tel:+1 (201) 731-6299">201-731-6299</div>
                  <div className="text-sm font-medium text-gray-500" href="mailto:Officemanager@giablessedtrucking.com" >Officemanager@giablessedtrucking.com</div>
                </div>
              
              </div>
            </div>
          </Disclosure.Panel>
        </>
      )}
    </Disclosure>
  )
}
