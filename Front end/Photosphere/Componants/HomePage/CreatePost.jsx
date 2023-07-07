import React, { useRef, useState, useEffect, useContext } from 'react'
import './CreatePost.css'
import AxiosContext from '../../Contexts/AxioContext'
function CreatePost({ setCreatePost }) {
    const [isfiles, setIsfiles] = useState(false)
    const [files, setFiles] = useState(null)
    const [caption, setCaption] = useState('')
    const fileref = useRef(null)
    const axiosInstance = useContext(AxiosContext)

    const handleFileinput = (e) => {
        let fileInput = e.target.files
        fileref.current.style.display = 'block';
        if (files) setFiles([...files, ...fileInput])
        else setFiles(fileInput)
        setIsfiles(true)
    }

    const manageSubmit = () => {
        const data = new FormData();
        let media = []
        // data.append('files', Array.from(files))
        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
        }
        data.append('caption', caption);
        const config = {
            headers: {
                'content-type': 'multipart/form-data'
            }
        };
        axiosInstance.post('post/createpost', data, config).then((response) => {
            console.log(response.data.result);
            if (response.data.result) {
                setCreatePost(false)
            }
        })
    }
    return (
        <div className='create-post'>
            <div className='card post-box' style={{ width: '75vh', height: '75vh', maxWidth: '75vh', maxHeight: '80vh' }}>
                <div className="col-1 d-flex justify-content-between w-100"
                    onClick={() => setCreatePost(false)}
                >
                    <span className='px-2'>Add image/video</span>
                    <i className="bi bi-x-circle p-1 pe-2"></i>
                </div>

                <div className="col d-flex justify-content-center" style={{ objectFit: 'fill' }}>
                    {isfiles ?
                        <div id="carouselExample" className="carousel d-flex justify-content-center align-items-center" style={{ minWidth: '35vh', maxWidth: '36vh' }}>
                            <div className="carousel-inner">
                                {Array.from(files).map((file, index) => (
                                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''}`} >
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
                        <div className="d-flex justify-content-center align-items-center" style={{ height: '100%', cursor: 'pointer' }}
                            onClick={() => fileref.current.click()}
                        >
                            <div>Click to add media</div>

                        </div>}
                </div>
                <div className='d-flex justify-content-center'>
                    <input ref={fileref} type="file" multiple style={{ display: 'none' }} className='form-control' id="formFile"
                        onChange={handleFileinput}
                    />
                </div>

                <div className="col-3 w-100">
                    <textarea rows="2" className='w-100' placeholder='Caption' style={{ resize: 'none' }}
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>


                <div className="col-1 p-2">
                    <button type="button" className="btn btn-sm btn-primary" data-bs-toggle="button" aria-pressed="false"
                        onClick={manageSubmit}
                    >Post</button>
                </div>
            </div>
        </div>
    )
}

export default CreatePost