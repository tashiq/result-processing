import ToolbarGen from '../../Toolbar/Toolbar';
import './Mark.css'
const Mark = () => {
    let option = document.querySelectorAll('input[name=exam]');
    for (const item of option) {
        document.getElementById('catm-field').style.display = "none";
        document.getElementById('semester-field').style.display = "none";
        item.addEventListener('click', () => {

            if (item.value === 'catm') {
                document.getElementById('catm-field').style.display = "block";
                document.getElementById('semester-field').style.display = "none";
            }
            else {
                document.getElementById('catm-field').style.display = "none";
                document.getElementById('semester-field').style.display = "block";
            }
        })
    }
    return (
        <div>
            <ToolbarGen title={"mark input"} />
            <div className='mark-container'>
                <div className='confirmation'>
                    <div>
                        Confirm the type of the Marks
                    </div>
                    <div className='radio'>
                        <input type="radio" id="catm" name="exam" value="catm" />
                        <label for="catm">CATM marks</label><br />
                        <input type="radio" id="semester" name="exam" value="semester" />
                        <label for="semester">Semester final marks</label>
                    </div>
                </div>
                <div className='ajura'>
                    <div id='catm-field'>
                        {/* id, course code, mark,  */}
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course Code</div>
                            <input className='b-input mark-input' />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Student ID</div>
                            <input className='b-input mark-input' />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Mark</div>
                            <input className='b-input mark-input' autoComplete='off' />
                        </div>
                        <button className='btn btn-outline-dark mt-2 '>Submit</button>
                    </div>
                    <div id='semester-field'>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Course Code</div>
                            <input className='b-input mark-input' />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Paper Code</div>
                            <input className='b-input mark-input' autoComplete='off' />
                        </div>
                        <div className='mark-item'>
                            <div className='icon mark-icon'>Mark</div>
                            <input className='b-input mark-input' autoComplete='off' />
                        </div>
                        <button className='btn btn-outline-dark mt-2 '>Submit</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Mark;