const replaceURLs = (text: string) => {
  const regex =
    /(https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|www\.[a-zA-Z0-9][a-zA-Z0-9-]+[a-zA-Z0-9]\.[^\s]{2,}|https?:\/\/(?:www\.|(?!www))[a-zA-Z0-9]+\.[^\s]{2,}|www\.[a-zA-Z0-9]+\.[^\s]{2,})/gi;

  const newText = text.replace(regex, url => {
    return `<a href="${
      url.startsWith('http') ? url : `https://${url}`
    }" rel="noopener noreferrer" target="_blank">${url}</a>`;
  });

  return newText;
};

export default replaceURLs;
