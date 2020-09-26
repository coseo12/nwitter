import React, { useState, useEffect } from 'react';
import { dbService, storageService } from 'fbase';
import Nweet from 'components/Nweet';
import { v4 as uuidv4 } from 'uuid';

const Home = ({ userObj }) => {
  const [nweet, setNweet] = useState('');
  const [nweets, setNweets] = useState([]);
  const [attachment, setAttachment] = useState(null);

  const onSubmit = async event => {
    event.preventDefault();
    const fileRef = storageService.ref().child(`${userObj.uid}/${uuidv4()}`);
    const response = await fileRef.putString(attachment, 'data_url');
    console.log(response);
    // await dbService.collection('nweets').add({
    //   text: nweet,
    //   createdAt: Date.now(),
    //   creatorId: userObj.uid,
    // });
    // setNweet('');
  };
  const onChange = event => {
    const {
      target: { value },
    } = event;
    setNweet(value);
  };
  const onFileChange = event => {
    const {
      target: { files },
    } = event;
    const theFile = files[0];
    const reader = new FileReader();
    reader.onloadend = finishedEvent => {
      const {
        target: { result },
      } = finishedEvent;
      setAttachment(result);
    };
    reader.readAsDataURL(theFile);
  };
  const onClearAttachmentClick = () => {
    setAttachment(null);
  };

  useEffect(() => {
    dbService.collection('nweets').onSnapshot(snapshot => {
      const nweetArray = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNweets(nweetArray);
    });
  }, []);

  return (
    <div>
      <form>
        <input
          value={nweet}
          onChange={onChange}
          type="text"
          placeholder="What's on your mind?"
          maxLength={120}
        />
        <input onChange={onFileChange} type="file" accept="image/*" />
        <button onClick={onSubmit} type="submit">
          Nweet
        </button>
        {attachment && (
          <div>
            <img src={attachment} width="50px" height="50px" alt="" />
            <button onClick={onClearAttachmentClick}>Clear</button>
          </div>
        )}
      </form>
      <div>
        {nweets.map(nweet => (
          <Nweet
            key={nweet.id}
            nweetObj={nweet}
            isOwner={nweet.creatorId === userObj.uid}
          />
        ))}
      </div>
    </div>
  );
};

export default Home;
