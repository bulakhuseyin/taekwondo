
export const Card = ({ children, ...props }) => <div className='border rounded shadow' {...props}>{children}</div>;
export const CardContent = ({ children, ...props }) => <div {...props}>{children}</div>;
