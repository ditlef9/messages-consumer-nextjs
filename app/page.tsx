'use client';

import Link from "next/link";
import { useEffect, useState } from "react";


export default function Home() {

  // State for background style
  const [bgStyle, setBgStyle] = useState({});
  const [messages, setMessages] = useState<MessageI[]>([]);
  const [loading, setLoading] = useState(false);
  const [token, setToken] = useState();

  // Retrieve email and password from environment variables
  const email = process.env.NEXT_PUBLIC_BACKEND_EMAIL;
  const password = process.env.NEXT_PUBLIC_BACKEND_PASSWORD;
  if (!email || !password) {
    console.error("Error: Missing environment variables for email or password.");
    return <p style={{ color: "red", textAlign: "center" }}>Error: Missing environment variables for email or password. Please check your .env.local file.</p>;
  }

  useEffect(() => {
    // Set random background
    const backgrounds = [
      '/gfx/hero/pexels-asphotograpy-868110.jpg',
      '/gfx/hero/pexels-pixabay-264529.jpg',
      '/gfx/hero/pexels-pixabay-264636.jpg',
    ];
    const randomBg = backgrounds[Math.floor(Math.random() * backgrounds.length)];
    setBgStyle({ backgroundImage: `url(${randomBg})` });

    // Fetch token
    const fetchToken = async () => {
      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/users/login', {
          method: 'POST', // Changed to POST
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: email, // Use the email from environment variables
            password: password, // Use the password from environment variables
          }),
        });

        if (!response.ok) throw new Error('Failed to fetch token');
        const data = await response.json();
        setToken(data.token); // Assume the token is returned in the "token" field
      } catch (error) {
        console.error('Failed to fetch token', error);
      } finally {
        setLoading(false);
      }
    };

    fetchToken();
  }, []);

  useEffect(() => {
    // Fetch messages only if the token is available
    const fetchMessages = async () => {
      if (!token) return;

      setLoading(true);
      try {
        const response = await fetch('http://localhost:8080/api/v1/messages', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + token,
          },
        });
        if (!response.ok) throw new Error('Failed to fetch messages');
        const data = await response.json();
        setMessages(data.data); // Adjusted to extract the messages array from the response
      } catch (error) {
        console.error('Failed to fetch messages', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [token]); // Depend on the token

  return (
    <div className="container" style={bgStyle}>
      <div className="container-content">
        {/* Header */}
        <header>
          <p><a href="/">Message Consumer</a></p>
          <span>Consumes messages from the backend</span>
        </header>

        {/* Main */}
        <main>
          {loading ? (
            <p>Loading messages...</p>
          ) : (
            <div className="messages-list">
              {messages.map((message) => (
                <div key={message.msg_id} className="message">

                  
                  <div className="message-content" dangerouslySetInnerHTML={{ __html: message.msg_content }}></div>
                  

                  {/* Attachments */}
                  {message.attachments.length > 0 && (
                    <div className="attachments">
                      {message.attachments.map((attachment) => (
                        <div key={attachment.attachment_id} className="attachment">
                          {attachment.attachment_type === "video" ? (
                            <video controls width="100%" src={attachment.attachment_url}>
                              Your browser does not support the video tag.
                            </video>
                          ) : (
                            <a href={attachment.attachment_url} target="_blank" rel="noopener noreferrer"><img src={attachment.attachment_url} alt={attachment.attachment_meta_description || 'Attachment'} /></a>
                          )}
                        </div>
                      ))}
                    </div>
                  )}

                  <p>
                  <a href={message.msg_url} target="_blank" rel="noopener noreferrer">View Message at {message.msg_platform}</a>
                  </p>
                </div>
              ))}
            </div>
          )}
        </main>

        {/* Footer */}
        <footer>
          <ul>
            <li><a href="http://github.com/ditlef9">&copy; 2024 Ditlefsen</a></li>
          </ul>
        </footer>
      </div> {/* //container-content */}
    </div>
  );
}