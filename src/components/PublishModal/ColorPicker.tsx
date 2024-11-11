import { hexToRgba } from "@/utils/utils"
import { Col, Row } from "antd"

const colors = [
    `linear-gradient(180deg, ${hexToRgba('#3C3C3C', 0.4)} 0%, ${hexToRgba('#CDFCFF', 0.4)} 100%)`,
    `linear-gradient(180deg, ${hexToRgba('#823DBF', 0.6)} 0%, ${hexToRgba('#492966', 0.6)} 100%)`,
    `linear-gradient(180deg, ${hexToRgba('#2A42D4', 0.6)} 0%, ${hexToRgba('#192674', 0.6)} 100%)`,
    `linear-gradient(180deg, ${hexToRgba('#2197D7', 0.6)} 0%, ${hexToRgba('#1B4E6A', 0.6)} 100%)`,
]
export const getRadomColor = () => {
    return colors[Math.floor(Math.random() * colors.length)]
}
export default (props: any) => {

    return <Row gutter={[24, 24]}>
        {colors.map((color, index) => {
            return <Col span={3} key={index} >
                <div style={{ background: color, width: 36, height: 36, borderRadius: '50%', boxSizing: 'border-box', cursor: 'pointer', border: props.value === color ? '2px solid #fff' : 'none' }} onClick={() => {
                    props.onChange && props.onChange(color)
                }}>

                </div>
            </Col>
        })}
    </Row>
}