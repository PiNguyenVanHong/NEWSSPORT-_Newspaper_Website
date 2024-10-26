import { useEffect } from "react";
import { Link } from "react-router-dom";
import { animatePageIn } from "@/lib/animations";

const info = [
  {
    id: 1,
    title: "General inquiries",
    content: "Inacustserv@cdsfulfillment.com",
    phone: "+84 123 456 78 90",
  },
  {
    id: 2,
    title: "Advertising Department",
    content: "Ads@artmediaholdings.com",
  },
  {
    id: 2,
    title: "The Art in America Guide",
    content: "Guide@artinamericamag.com",
  },
  {
    id: 2,
    title: "Accounts Receivable",
    content: "Finace@artmediaholdings.com",
  },
  {
    id: 2,
    title: "Letters To The Editor",
    content: "Aiaeditor@artinamericamag.com",
  },
  { id: 2, title: "Website", content: "Info@artmediaholdings.com" },
  {
    id: 2,
    title: "Accolades and Article Reprints & Permissions",
    content: "PMC@wrightsmedia.com",
  },
];

const socials = [
  { id: 1, name: "Facebook", link: "/" },
  { id: 2, name: "Twitter", link: "/" },
  { id: 3, name: "Instagram", link: "/" },
  { id: 4, name: "Pinterest", link: "/" },
  { id: 5, name: "Linkedin", link: "/" },
  { id: 6, name: "Youtube", link: "/" },
];

interface ContactUsPageProps {
  
}

function ContactUsPage({ }: ContactUsPageProps) {
  useEffect(() => {
    animatePageIn();
  }, []);
  
  return (
    <div className="about w-full max-w-7xl mx-auto">
      <h1 className="text-9xl text-foreground-red font-playfair uppercase font-semibold mb-4">
        contact us
      </h1>
      <div className="grid grid-cols-3 items-stretch gap-20 border-2 border-foreground-gray p-10 my-10">
        <div className="col-span-1 font-semibold text-lg">
          We work hard to answer queries and ensure your experience of The News
          Sport+ is as good as we can possibly make it.
        </div>
        <div className="col-span-1 text-foreground-gray font-medium text-lg">
          On this page you can find out how to contact us.
        </div>
        <div className="col-span-1"></div>
        <div className="col-span-1 capitalize text-foreground-red text-4xl font-semibold leading-relaxed">
          475 Fifth Avenue, New York, NY 10017
        </div>
        <div className="col-span-2">
          <div className="grid grid-cols-2 items-stretch gap-10">
            {info.map((item, index) => (
              <div key={index} className="col-span-1 flex flex-col gap-2">
                <div className="text-foreground-gray text-lg">{item.title}</div>
                <div className="font-semibold text-lg">
                  {item.content} <br />
                  {item.phone}
                </div>
              </div>
            ))}
            <div className="col-span-2 flex flex-col gap-2 my-10">
              <div className="text-foreground-gray text-lg">Follow us</div>
              <div className="grid grid-col-3 xl:grid-cols-6 gap-4">
                {socials.map((item, index) => (
                    <Link key={index} to={item.link} className="hover:underline font-semibold">{item.name}</Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ContactUsPage;
