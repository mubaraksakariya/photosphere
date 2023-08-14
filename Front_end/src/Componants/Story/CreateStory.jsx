import React, { useContext, useEffect, useRef, useState } from 'react';
import './CreateStory.css';
import AxiosContext from '../../Contexts/AxioContext';
import { HomeContext } from '../../Contexts/HomeContext';

function CreateStory() {
    const axiosInstance = useContext(AxiosContext);
    const { setIsStory, setStories, setStoryUerList } = useContext(HomeContext)

    const fileRef = useRef();
    const [file, setFile] = useState(null);
    const [isFile, setIsFile] = useState(false);
    const manageInput = () => {
        fileRef.current.click();
    };

    const manageFile = (e) => {
        if (e.target.files[0] !== null && e.target.files[0] !== '') {
            setFile(e.target.files[0]);
            setIsFile(true);
        }
    };

    const manageSubmit = () => {
        const data = new FormData();
        data.append('file', file);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axiosInstance.post('story/createstory', data, config).then((response) => {
            if (response.data.result) {
                // setStoryUerList(old => [...old, response.data.user])
                setIsStory(false)
            }
        });
    };

    return (
        <div className="row justify-content-center align-items-center g-2" >
            <div className="col-md" onClick={() => setIsStory(false)}></div>
            <div className="col-md-8 story-main-div">
                <div className="d-flex flex-column justify-content-center rounded"
                    style={{
                        width: '75vh',
                        height: '76vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <div className="position-relative"
                        onClick={manageInput}
                        style={{
                            width: '100%',
                            minHeight: '70vh',
                            cursor: 'pointer',
                            overflow: 'hidden',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                        }}
                    >
                        {isFile && file ? (
                            <img
                                className='p-0 m-0'
                                src={URL.createObjectURL(file)}
                                alt=""
                                style={{
                                    display: 'block',
                                    objectFit: 'contain',
                                    maxWidth: '98%',
                                    maxHeight: '98%',
                                    width: 'auto',
                                    height: 'auto'
                                }}
                            />
                        ) : (
                            <p className="m-auto">Click to add media to story</p>
                        )}
                    </div>
                    <div className="d-flex justify-content-start w-100 p-2">
                        <input type="file" name="" id="" hidden ref={fileRef} onChange={manageFile} />
                        <button className="btn btn-sm btn-success" onClick={manageSubmit}>
                            Submit
                        </button>
                        <span className='px-2'></span>
                        <button className="btn btn-sm btn-danger" onClick={() => setIsStory(false)}>
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
            <div className="col-md" ></div>
        </div>
    );
}

export default CreateStory;
