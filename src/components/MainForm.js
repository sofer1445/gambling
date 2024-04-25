import React from 'react';

const MainForm = (secret,data) => (
    <form>
        <div>
            {secret ? (
                <div>
                    <div>
                        {"success"}
                    </div>
                </div>
            ) : (
                <div>
                    <div>
                        {"fail"}
                    </div>
                </div>
            )}
        </div>

    </form>
);
export default MainForm;