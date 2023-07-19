import React, { useRef, useState, useEffect, useContext } from 'react'
import './CreatePost.css'
import AxiosContext from '../../Contexts/AxioContext'
import { HomeContext } from '../../Contexts/HomeContext'
import { v4 as uuidv4 } from 'uuid';
function CreatePost() {
    const axiosInstance = useContext(AxiosContext)
    const { setCreatePost, setPosts, setIsLoading } = useContext(HomeContext)
    const [isfiles, setIsfiles] = useState(false)
    const [files, setFiles] = useState(null)
    // const [caption, setCaption] = useState('')
    const fileref = useRef(null)
    const captionRef = useRef(null)

    const handleFileinput = (e) => {
        let fileInput = e.target.files
        fileref.current.style.display = 'block';
        if (files) setFiles([...files, ...fileInput])
        else setFiles(fileInput)
        setIsfiles(true)
    }

    const manageSubmit = () => {
        setIsLoading(true)
        const data = new FormData();
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        data.append('caption', captionRef.current.value);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axiosInstance.post('post/createpost', data, config).then((response) => {
            setIsLoading(true)
            if (response.data.result) {
                let newPost = response.data.post
                setPosts(prevPosts => [newPost, ...prevPosts])
                setCreatePost(false)
            }
        })
    }
    return (
        <div className="row justify-content-center align-items-center g-2" >
            <div className="col-md" ></div>
            <div className="col-md-8 post-main-div">
                <div className='d-flex flex-column rounded"'
                    style={{
                        width: '75vh',
                        height: '75vh',
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        backgroundColor: 'white'
                    }}
                >
                    <div className="col-1 d-flex justify-content-between w-100"
                        onClick={() => setCreatePost(false)}
                    >
                        <span className='px-2'>Add image/video</span>
                        <i className="bi bi-x-circle p-1 pe-2"></i>
                    </div>

                    <div className="rounded  position-relative"
                        style={{
                            objectFit: 'fill',
                            width: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            height: '100%'
                        }}
                    >
                        {isfiles ?
                            <div id="carouselExample" className="carousel d-flex justify-content-center align-items-center"
                                style={{
                                    minWidth: '35vh',
                                    display: 'block',
                                    objectFit: 'contain',
                                    maxWidth: '100%',
                                    maxHeight: '100%',
                                    width: 'auto',
                                    height: 'auto'
                                }}
                            >
                                <div className="carousel-inner">
                                    {Array.from(files).map((file, index) => (
                                        <div key={uuidv4()} className={`carousel-item ${index === 0 ? 'active' : ''}`} >
                                            <img src={URL.createObjectURL(file)} className="d-block w-100" alt={`Slide ${index + 1}`}
                                                style={{ maxHeight: '50vh' }}
                                            />
                                        </div>
                                    ))}
                                </div>
                                {files.length > 1 &&
                                    <>
                                        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                                            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden" >Previous</span>
                                        </button>
                                        <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                                            <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                            <span className="visually-hidden">Next</span>
                                        </button>
                                    </>
                                }
                            </div>
                            :
                            <div className="d-flex justify-content-center align-items-center"
                                style={{
                                    width: '100%',
                                    height: '100%',
                                    cursor: 'pointer',
                                }}
                                onClick={() => fileref.current.click()}
                            >
                                <h6 className="m-auto">Click to add media</h6>

                            </div>}
                    </div>
                    <div className=''>
                        <input ref={fileref} type="file" multiple style={{ display: 'none' }} className='form-control' id="formFile"
                            onChange={handleFileinput}
                        />
                    </div>

                    <div className="col-3 w-100">
                        <textarea rows="2" className='w-100' placeholder='Caption' style={{ resize: 'none' }}
                            // value={caption}
                            // onChange={(e) => setCaption(e.target.value)}
                            ref={captionRef}
                        />
                    </div>


                    <div className="col-12 p-2 w-100">
                        <button type="button" className="btn btn-sm btn-success px-3" data-bs-toggle="button" aria-pressed="false"
                            onClick={manageSubmit}
                        > Post </button> <span className='px-1'></span>
                        <button type="button" className="btn btn-sm btn-danger" data-bs-toggle="button" aria-pressed="false"
                            onClick={() => setCreatePost(false)}
                        >Cancel</button>
                    </div>
                </div>
            </div>
            <div className="col-md"></div>
        </div>

    )
}

export default CreatePost