import { Col, Row } from "antd"

const colors = [
    '#515151', '#556DFF', '#7A2DDD', '#C39EFF', '#84D4FF', '#FF7AF3', '#55EAF4', '#7559E7'
]
export const getRadomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}
export default (props: any) => {

    return <Row gutter={[24, 24]}>
        {colors.map((color, index) => {
            return <Col span={3} key={index} >
                <div style={{ background: color, width: 36, height: 36, borderRadius: '50%',boxSizing:'border-box', cursor: 'pointer', border: props.value === color ? '2px solid #fff' : 'none' }} onClick={() => {
                    props.onChange && props.onChange(color)
                }}>

                </div>
            </Col>
        })}
    </Row>
}