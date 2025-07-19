"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify"; // Optional for success/error
import Image from "next/image";

export default function ContactUs() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Send POST request to API
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, message }),
    });

    setLoading(false);

    if (res.ok) {
      setEmail("");
      setMessage("");
      toast.success("Message sent successfully!");
    } else {
      toast.error("Failed to send message. Try again later.");
    }
  };

  // WhatsApp link (update with your phone number)
  const whatsappNumber = "+923149493088";
  const whatsappMessage = encodeURIComponent(
    "Hi, I want to contact you from your website!"
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="min-h-screen wrapper  flex flex-col md:flex-row  gap-5">
      <div className="flex-1 hidden md:flex ">
        <Image
          src="/contact.png"
          alt="contact us"
          width={400}
          height={500}
          className="object-contain h-full"
        />
      </div>
      <div className="flex-1/2 h-full pt-8">
        <h1 className="text-3xl font-bold mb-4">Contact Us</h1>
        <form
          className="space-y-4 bg-white dark:bg-gray-900 rounded shadow p-6"
          onSubmit={handleSubmit}
        >
          <Input
            type="email"
            placeholder="Your Email"
            value={email}
            required
            onChange={(e) => setEmail(e.target.value)}
          />
          <Textarea
            placeholder="Your Message"
            value={message}
            required
            onChange={(e) => setMessage(e.target.value)}
          />
          <Button type="submit" disabled={loading} className="cursor-pointer">
            {loading ? "Sending..." : "Send Message"}
          </Button>
        </form>
        <div className="mt-6 text-center">
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded shadow transition"
          >
            {/* WhatsApp Icon (optional, use react-icons/bs if you want) */}
            <svg width="24" height="24" fill="currentColor" className="mr-2">
              <path d="M20.52 3.478A11.943 11.943 0 0 0 12.004 0C5.374 0 .003 5.37.003 12c0 2.12.55 4.21 1.59 6.05L0 24l6.17-1.61A11.944 11.944 0 0 0 12 24C18.628 24 24 18.63 24 12c0-3.197-1.244-6.207-3.48-8.522zM12 22.016c-1.785 0-3.54-.483-5.05-1.395l-.362-.216-3.664.957.98-3.577-.236-.368A9.978 9.978 0 0 1 2.012 12C2.012 6.48 6.486 2.01 12.003 2.01c5.515 0 9.988 4.473 9.988 9.99 0 5.518-4.473 9.99-9.988 9.99zm5.152-7.517c-.243-.121-1.437-.705-1.66-.785-.223-.08-.387-.121-.552.122-.163.242-.63.785-.773.947-.142.162-.284.183-.527.061-.243-.122-1.026-.378-1.956-1.203-.723-.645-1.212-1.438-1.355-1.68-.142-.243-.015-.374.106-.495.108-.108.242-.282.363-.423.121-.142.161-.243.242-.406.081-.163.04-.305-.02-.426-.061-.122-.552-1.335-.755-1.825-.2-.482-.403-.417-.552-.426l-.47-.009c-.163 0-.427.061-.651.305-.223.244-.857.837-.857 2.036s.877 2.362 1 2.527c.122.163 1.73 2.64 4.191 3.598.586.201 1.044.322 1.401.411.588.15 1.125.13 1.551.079.473-.055 1.437-.587 1.641-1.154.202-.568.202-1.055.142-1.155-.06-.1-.22-.162-.462-.284z"></path>
            </svg>
            Message us on WhatsApp
          </a>
        </div>
      </div>
    </div>
  );
}
